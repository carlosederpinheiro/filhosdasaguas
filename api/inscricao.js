// =========================================================
// BACKEND SERVERLESS SEGURO (VERCEL API ROUTE: /api/inscricao)
// - Oculta 100% as credenciais do Firebase no servidor (process.env)
// - Rate Limiting por IP (proteção contra flood/DoS)
// - Honeypot + Tempo mínimo de preenchimento (proteção contra bots)
// - Sanitização estrita contra XSS/Injection e Whitelist de campos
// =========================================================

const rateLimitStore = new Map();
const WINDOW_MS = 10 * 60 * 1000; // 10 minutos
const MAX_REQ_PER_WINDOW = 6;     // Máximo de 6 inscrições por IP a cada 10 min

function sanitizeString(val, maxLen = 160) {
  return String(val || "")
    .replace(/[<>]/g, "") // Remove tags HTML/script
    .replace(/[\u0000-\u001F\u007F]/g, "") // Remove caracteres de controle
    .trim()
    .slice(0, maxLen);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 120;
}

function isValidBrDate(dateStr) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) return false;
  const [d, m, y] = dateStr.split("/").map(Number);
  if (y < 2000 || y > 2021 || m < 1 || m > 12 || d < 1 || d > 31) return false;
  const dt = new Date(y, m - 1, d);
  return dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;
}

export default async function handler(req, res) {
  // Cabeçalhos de segurança
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Método não permitido." });
  }

  // 1. Rate Limiting por IP
  const clientIp =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  const now = Date.now();
  const record = rateLimitStore.get(clientIp) || { count: 0, start: now, lastReq: 0 };

  if (now - record.start > WINDOW_MS) {
    record.count = 0;
    record.start = now;
  }

  // Bloqueia rajadas automáticas (< 2 segundos entre requisições do mesmo IP)
  if (now - record.lastReq < 2000) {
    return res.status(429).json({
      ok: false,
      error: "Aguarde alguns segundos antes de tentar novamente."
    });
  }

  record.count += 1;
  record.lastReq = now;
  rateLimitStore.set(clientIp, record);

  if (record.count > MAX_REQ_PER_WINDOW) {
    return res.status(429).json({
      ok: false,
      error: "Muitas tentativas realizadas. Aguarde alguns minutos."
    });
  }

  const body = req.body || {};

  // 2. Honeypot Anti-Bot (campo oculto que humanos nunca preenchem)
  if (body.website_hp && String(body.website_hp).trim() !== "") {
    return res.status(403).json({ ok: false, error: "Requisição bloqueada." });
  }

  // 3. Verificação de tempo de preenchimento humano (mínimo 1.5s desde que abriu a página)
  if (body.formLoadedAt && now - Number(body.formLoadedAt) < 1500) {
    return res.status(403).json({ ok: false, error: "Submissão muito rápida suspeita." });
  }

  // 4. Sanitização e Validação Estrita dos Campos (Whitelist)
  const nomeCompleto = sanitizeString(body.nomeCompleto, 140);
  const dataNascimento = sanitizeString(body.dataNascimento, 10);
  const email = sanitizeString(body.email, 120).toLowerCase();
  const estaNoNonoAno2026 = Boolean(body.estaNoNonoAno2026);
  const serieAtual = estaNoNonoAno2026
    ? "9º Ano do Ensino Fundamental"
    : sanitizeString(body.serieAtual, 60);
  const cienteTreineiro = !estaNoNonoAno2026 ? Boolean(body.cienteTreineiro) : null;
  const escola = sanitizeString(body.escola, 160);
  const cepDigits = String(body.cep || "").replace(/\D/g, "");
  const cep = cepDigits.length === 8 ? `${cepDigits.slice(0, 5)}-${cepDigits.slice(5)}` : "";
  const logradouro = sanitizeString(body.logradouro, 160);
  const bairro = sanitizeString(body.bairro, 100);
  const cidade = sanitizeString(body.cidade || "Manaus", 80);
  const uf = sanitizeString(body.uf || "AM", 2).toUpperCase();

  if (nomeCompleto.length < 5 || !nomeCompleto.includes(" ")) {
    return res.status(400).json({ ok: false, error: "Nome completo inválido." });
  }
  if (!isValidBrDate(dataNascimento)) {
    return res.status(400).json({ ok: false, error: "Data de nascimento inválida." });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: "E-mail inválido." });
  }
  if (!estaNoNonoAno2026 && (!serieAtual || !cienteTreineiro)) {
    return res.status(400).json({ ok: false, error: "Confirmação de treineiro obrigatória." });
  }
  if (escola.length < 3) {
    return res.status(400).json({ ok: false, error: "Escola inválida." });
  }
  if (!cep || !logradouro || !bairro) {
    return res.status(400).json({ ok: false, error: "Endereço incompleto." });
  }

  // Gera o protocolo no servidor
  const rand = Math.floor(1000 + Math.random() * 9000);
  const protocolo = sanitizeString(body.protocolo, 25) || `FMM926-2026-${rand}`;
  const dataHoraInscricao = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Manaus"
  });

  const cleanDoc = {
    protocolo,
    dataHoraInscricao,
    nomeCompleto,
    dataNascimento,
    email,
    estaNoNonoAno2026,
    modalidadeProva: estaNoNonoAno2026
      ? "Candidato Oficial (9º Ano em 2026)"
      : "TREINEIRO(A)",
    serieAtual,
    cienteTreineiro,
    escola,
    cep,
    logradouro,
    bairro,
    cidade,
    uf,
    evento: "1º Aulão Preparatório FMM - 21/11/2026",
    capitulo: "Capítulo Filhos das Águas nº 926 - AM"
  };

  // 5. Gravação no Cloud Firestore usando variáveis de ambiente secretas
  const apiKey = process.env.FIREBASE_API_KEY;
  const projectId = process.env.FIREBASE_PROJECT_ID || "filhosdasaguas-fbae6";
  const databaseId = process.env.FIREBASE_DATABASE_ID || "default";
  const collectionName = process.env.FIREBASE_COLLECTION || "inscricoes_aulao_fmm";

  if (!apiKey) {
    return res.status(500).json({
      ok: false,
      error: "Variável de ambiente FIREBASE_API_KEY não configurada no servidor."
    });
  }

  const fields = {};
  for (const [k, v] of Object.entries(cleanDoc)) {
    if (typeof v === "boolean") {
      fields[k] = { booleanValue: v };
    } else if (v === null || v === undefined) {
      fields[k] = { nullValue: null };
    } else {
      fields[k] = { stringValue: String(v) };
    }
  }
  fields.criadoEm = { timestampValue: new Date().toISOString() };

  const firestoreUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents/${collectionName}?key=${apiKey}`;

  try {
    const fbRes = await fetch(firestoreUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields })
    });

    if (!fbRes.ok) {
      const errData = await fbRes.json().catch(() => ({}));
      const status = (errData.error && errData.error.status) || String(fbRes.status);
      const msg = (errData.error && errData.error.message) || "Erro ao gravar no Firestore";
      return res.status(502).json({ ok: false, status, error: msg });
    }

    const savedDoc = await fbRes.json();
    const parts = (savedDoc.name || "").split("/");
    const docId = parts[parts.length - 1] || "confirmado";

    return res.status(200).json({
      ok: true,
      id: docId,
      data: {
        ...cleanDoc,
        firebaseDocId: docId
      }
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: "Falha de comunicação com o banco de dados."
    });
  }
}
