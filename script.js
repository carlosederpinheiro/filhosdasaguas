// =========================================================
// FRONT-END SEGURO (ZERO CREDENCIAIS EXPOSTAS NO CÓDIGO-FONTE)
// As chaves do Firebase ficam exclusivamente em .env (local) e nas
// Environment Variables criptografadas da Vercel (/api/inscricao)
// =========================================================
const STORAGE_KEY = "aulao_fmm_926_inscritos";
const COOLDOWN_KEY = "aulao_fmm_926_last_submit";
const FORM_LOADED_AT = Date.now();

// Catálogo inicial amplo de escolas de Manaus (SEDUC-AM, SEMED, CEMEIs/CMEIs, Militares e Particulares)
const ESCOLAS_MANAUS_BASE = [
  // CEMEIs / CMEIs e Escolas Municipais (SEMED Manaus)
  { nome: "CEMEI Heitor Villa Lobos", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Heitor Villa Lobos", rede: "Municipal (SEMED)" },
  { nome: "CMEI Maestro Heitor Villa-Lobos", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Prof. Waldir Garcia", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Rodolpho Valle", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Engenheiro João Alberto Menezes Braga", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Vicente de Paula", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Antonina Borges de Sá", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Dr. João Queiroz", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Madre Tereza de Calcutá", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Jorge Amado", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Dom Jacson Damasceno Rodrigues", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Escritor Lima Barreto", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Prof.ª Sônia Maria da Silva Barbosa", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Senador Fábio Lucena", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Síria Mamed Amed", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Vila da Felicidade", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Aristófanes Bezerra de Castro", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Poeta Carlos Drummond de Andrade", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Abílio Alencar", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Adolpho Ducke", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Álvaro Botelho Maia", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Ana Mota Braga", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Arthur Engrácio da Silva", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Benjamin Constant", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Cândido Honório", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Djalma Passos", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Elvira Borges", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Francisca Pergentina", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Frei Mario Monacelli", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Helena Augusta Walcott", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Irmã Dulce", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Jarlece da Conceição Zaranza", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal João Alfredo", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal João Braga", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal José Carlos Martins Mestrinho", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal José Sobreira do Nascimento", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Leonor Uchôa de Amorim", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Lúcia Melo Ferreira", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Maria Ferreira da Silva", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Maria Leide Amorim", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Monteiro Lobato", rede: "Municipal (SEMED)" },
  { nome: "CEMEI Monteiro Lobato", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Olavo Bilac", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Paulo Graça", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Pintor Cândido Portinari", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Presidente João Goulart", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Raimundo Nonato", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Rubem Braga", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal São Sebastião", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Solimões", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Themístocles Pinheiro Gadelha", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Ulysses Guimarães", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Vinicius de Moraes", rede: "Municipal (SEMED)" },
  { nome: "CEMEI Vinicius de Moraes", rede: "Municipal (SEMED)" },
  { nome: "CMEI Gustavo Capanema", rede: "Municipal (SEMED)" },
  { nome: "CMEI Humberto de Campos", rede: "Municipal (SEMED)" },
  { nome: "CMEI Cecília Meireles", rede: "Municipal (SEMED)" },
  { nome: "CEMEI Cecília Meireles", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Cecília Meireles", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Cora Coralina", rede: "Municipal (SEMED)" },
  { nome: "CEMEI Cora Coralina", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Clarice Lispector", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Rachel de Queiroz", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Manuel Bandeira", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Mário Quintana", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal Castro Alves", rede: "Municipal (SEMED)" },
  { nome: "Escola Municipal José de Alencar", rede: "Municipal (SEMED)" },

  // Colégios Militares (CMPM / CMM)
  { nome: "Colégio Militar da Polícia Militar I (CMPM I) - Petrópolis", rede: "Estadual / Militar" },
  { nome: "CMPM II - Escola Estadual Prof.ª Maria Teixeira Goes", rede: "Estadual / Militar" },
  { nome: "CMPM III - Escola Estadual Antônio da Encarnação Filho", rede: "Estadual / Militar" },
  { nome: "CMPM IV - Escola Estadual Áurea Pinheiro Braga", rede: "Estadual / Militar" },
  { nome: "CMPM V - Escola Estadual Tenente Coronel Cândido José Mariano", rede: "Estadual / Militar" },
  { nome: "CMPM VI - Escola Estadual Senador Evandro das Neves Carreira", rede: "Estadual / Militar" },
  { nome: "CMPM VII - Escola Estadual Lago Azul", rede: "Estadual / Militar" },
  { nome: "CMPM VIII - Escola Estadual Pedro Câmara", rede: "Estadual / Militar" },
  { nome: "Colégio Militar de Manaus (CMM) - Centro", rede: "Federal / Militar" },

  // CETIs e Escolas Estaduais (SEDUC-AM)
  { nome: "CETI Áurea Pinheiro Braga - Compensa", rede: "Estadual (SEDUC)" },
  { nome: "CETI Gilberto Mestrinho - Cachoeirinha", rede: "Estadual (SEDUC)" },
  { nome: "CETI Garcitylzo do Lago e Silva - Tarumã", rede: "Estadual (SEDUC)" },
  { nome: "CETI Elisa Bessa Freire - Jorge Teixeira", rede: "Estadual (SEDUC)" },
  { nome: "CETI João dos Santos Braga - Nova Cidade", rede: "Estadual (SEDUC)" },
  { nome: "CETI Dariana Zuleica Correa Lopes", rede: "Estadual (SEDUC)" },
  { nome: "CETI Marcantonio Vilaça II - Cidade Nova", rede: "Estadual (SEDUC)" },
  { nome: "CETI Professora Cinthia Régia Gomes do Livramento", rede: "Estadual (SEDUC)" },
  { nome: "CETI Zilda Arns Neumann - Parque Dez", rede: "Estadual (SEDUC)" },
  { nome: "CETI Engenheiro Sérgio Alfredo Pessoa Figueiredo", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Amazonense D. Pedro II", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Solon de Lucena", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Márcio Nery", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Senador Petrônio Portella", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Ruy Araújo", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Prof. Ruy Alencar", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Frei Silvio Vagheggi", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Nossa Senhora Aparecida", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Tiradentes", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Vasco Vasques", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Senador João Bosco Ramos de Lima", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Homero de Miranda Leão", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Francisca Botinelly Cunha e Silva", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Prof. José Bernardino Lindoso", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Ângelo Ramazzotti", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Antônio Lucena Bittencourt", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Estelita Tapajós", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Cacilda Braule Pinto", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Luizinha Nascimento", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Raimundo Gomes Nogueira", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Castelo Branco", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Euclides da Cunha", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Gonçalves Dias", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Jairo da Silva Rocha", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Josué Cláudio de Souza", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Machado de Assis", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Manoel Marçal de Araújo", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Nilo Peçanha", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Plácido Serrano", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Presidente Vargas", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Santos Dumont", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Barão do Rio Branco", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Princesa Isabel", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Marechal Hermes", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Duque de Caxias", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Getúlio Vargas", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Sócrates Bomfim", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Padre Agostinho Martin", rede: "Estadual (SEDUC)" },
  { nome: "Escola Estadual Prof.ª Maria Belém", rede: "Estadual (SEDUC)" },

  // Escolas Particulares / Filantrópicas
  { nome: "Instituto Denizard Rivail", rede: "Particular / Filantrópica" },
  { nome: "Colégio Dom Bosco - Manaus", rede: "Particular" },
  { nome: "Colégio La Salle - Manaus", rede: "Particular" },
  { nome: "Colégio Santa Dorotéia", rede: "Particular" },
  { nome: "Escola Nilton Lins", rede: "Particular" },
  { nome: "Colégio Adventista de Manaus", rede: "Particular" },
  { nome: "Colégio Brasileiro Pedro Silvestre", rede: "Particular" },
  { nome: "Centro Educacional Século", rede: "Particular" },
  { nome: "Centro Educacional Adalberto Valle", rede: "Particular" },
  { nome: "Colégio Martha Falcão", rede: "Particular" },
  { nome: "Colégio Preciosíssimo Sangue", rede: "Particular" },
  { nome: "Colégio Nossa Senhora Auxiliadora", rede: "Particular" },
  { nome: "Colégio Palas Atena", rede: "Particular" },
  { nome: "Colégio Lato Sensu", rede: "Particular" },
  { nome: "Colégio Conexão", rede: "Particular" },
  { nome: "Escolas IDAAM", rede: "Particular" }
];

let lastRegistration = null;
let apiAbortController = null;
let apiDebounceTimer = null;
let activeSuggestionIndex = -1;
let cachedLogoDataUrl = null;

// Lista consolidada em memória
const todasEscolasManaus = [...ESCOLAS_MANAUS_BASE];

function initApp() {
  initMobilePosterToggle();
  initNonoAnoLogic();
  initBirthDateMaskAndAge();
  initCepLookup();
  initSchoolAutocomplete();
  preloadAllManausSchoolsSafe();
  initLiveValidationAndProgress();
  initFormSubmission();
  preloadChapterLogoForPdf();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}

function sanitizeInput(val, maxLen = 160) {
  return String(val || "")
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLen);
}

/* =========================================================
   0. TOGGLE DO CARTAZ NO MOBILE
   ========================================================= */
function initMobilePosterToggle() {
  const btn = document.getElementById("togglePosterBtn");
  const textSpan = document.getElementById("togglePosterText");
  const figure = document.getElementById("bannerFigure");
  if (!btn || !figure) return;

  btn.addEventListener("click", () => {
    const isCollapsed = figure.classList.toggle("mobile-collapsed");
    const expanded = !isCollapsed;
    btn.setAttribute("aria-expanded", String(expanded));
    textSpan.textContent = expanded
      ? "Ocultar Cartaz Oficial"
      : "Ver Cartaz Oficial do Aulão";
  });
}

/* =========================================================
   1. LÓGICA DO 9º ANO vs. TREINEIRO (EM 2026)
   ========================================================= */
function initNonoAnoLogic() {
  const radios = document.querySelectorAll('input[name="estaNoNonoAno"]');
  const treineiroAlert = document.getElementById("treineiroAlert");
  const serieAtual = document.getElementById("serieAtual");
  const cienteTreineiro = document.getElementById("cienteTreineiro");

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      clearError("estaNoNonoAno");
      if (radio.value === "nao" && radio.checked) {
        treineiroAlert.hidden = false;
        serieAtual.setAttribute("required", "required");
        cienteTreineiro.setAttribute("required", "required");
        setTimeout(() => {
          treineiroAlert.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
      } else if (radio.value === "sim" && radio.checked) {
        treineiroAlert.hidden = true;
        serieAtual.removeAttribute("required");
        cienteTreineiro.removeAttribute("required");
        serieAtual.value = "";
        cienteTreineiro.checked = false;
        clearError("serieAtual");
        clearError("cienteTreineiro");
      }
      updateFormProgress();
    });
  });

  serieAtual.addEventListener("change", () => {
    clearError("serieAtual");
    updateFormProgress();
  });

  cienteTreineiro.addEventListener("change", () => {
    clearError("cienteTreineiro");
    updateFormProgress();
  });
}

/* =========================================================
   2. DATA DE NASCIMENTO COM MÁSCARA RÁPIDA (DD/MM/AAAA) E CÁLCULO DE IDADE
   ========================================================= */
function parseBrDate(val) {
  const clean = String(val || "").replace(/\D/g, "");
  if (clean.length !== 8) return null;
  const day = parseInt(clean.slice(0, 2), 10);
  const month = parseInt(clean.slice(2, 4), 10);
  const year = parseInt(clean.slice(4, 8), 10);

  if (year < 2000 || year > 2021 || month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  const dt = new Date(year, month - 1, day);
  if (
    dt.getFullYear() !== year ||
    dt.getMonth() !== month - 1 ||
    dt.getDate() !== day
  ) {
    return null;
  }

  return dt;
}

function initBirthDateMaskAndAge() {
  const inputData = document.getElementById("dataNascimento");
  const helper = document.getElementById("idadeCalculada");
  if (!inputData || !helper) return;

  inputData.addEventListener("input", (e) => {
    clearError("dataNascimento");
    const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
    let formatted = digits;
    if (digits.length > 4) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    } else if (digits.length > 2) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    e.target.value = formatted;

    if (digits.length === 8) {
      const birthDate = parseBrDate(formatted);
      if (!birthDate) {
        setValidState("dataNascimento", false);
        setError("dataNascimento", "Data inválida. Verifique o dia, mês e ano.");
        helper.textContent = "";
        helper.classList.remove("age-badge");
      } else {
        setValidState("dataNascimento", true);
        const refDate = new Date(2026, 10, 21);
        let age = refDate.getFullYear() - birthDate.getFullYear();
        const m = refDate.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && refDate.getDate() < birthDate.getDate())) {
          age--;
        }
        helper.textContent = `✓ Idade na data do aulão (21/11/2026): ${age} anos`;
        helper.classList.add("age-badge");
      }
    } else {
      setValidState("dataNascimento", false);
      helper.textContent = "Digite apenas os números (ex: 15042012)";
      helper.classList.remove("age-badge");
    }
    updateFormProgress();
  });
}

/* =========================================================
   3. BUSCA AUTOMÁTICA DE CEP (ViaCEP + Fallback BrasilAPI)
   ========================================================= */
function initCepLookup() {
  const cepInput = document.getElementById("cep");
  const statusEl = document.getElementById("cepStatus");
  const spinner = document.getElementById("cepSpinner");
  const logradouroInput = document.getElementById("logradouro");
  const bairroInput = document.getElementById("bairro");
  const cidadeInput = document.getElementById("cidade");
  const ufInput = document.getElementById("uf");

  if (!cepInput) return;

  cepInput.addEventListener("input", (e) => {
    clearError("cep");
    const digits = e.target.value.replace(/\D/g, "").slice(0, 8);
    if (digits.length > 5) {
      e.target.value = `${digits.slice(0, 5)}-${digits.slice(5)}`;
    } else {
      e.target.value = digits;
    }

    if (digits.length === 8) {
      buscarCep(digits);
    } else {
      setValidState("cep", false);
      statusEl.textContent = "";
      statusEl.className = "cep-status";
    }
    updateFormProgress();
  });

  async function buscarCep(cepDigits) {
    statusEl.textContent = "Buscando...";
    statusEl.className = "cep-status loading";
    setValidState("cep", false);
    if (spinner) spinner.hidden = false;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cepDigits}/json/`);
      if (!res.ok) throw new Error("Falha no ViaCEP");
      const data = await res.json();
      if (data.erro) throw new Error("CEP não encontrado");

      preencherEndereco({
        logradouro: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        uf: data.uf
      });
    } catch {
      try {
        const resBrasil = await fetch(`https://brasilapi.com.br/api/cep/v2/${cepDigits}`);
        if (!resBrasil.ok) throw new Error("CEP não encontrado");
        const dataBr = await resBrasil.json();

        preencherEndereco({
          logradouro: dataBr.street,
          bairro: dataBr.neighborhood,
          cidade: dataBr.city,
          uf: dataBr.state
        });
      } catch {
        if (spinner) spinner.hidden = true;
        setValidState("cep", true);
        statusEl.textContent = "Preencha rua e bairro abaixo";
        statusEl.className = "cep-status error";
        bairroInput.focus();
      }
    }
  }

  function preencherEndereco({ logradouro, bairro, cidade, uf }) {
    if (spinner) spinner.hidden = true;
    setValidState("cep", true);

    if (logradouro) {
      logradouroInput.value = logradouro;
      clearError("logradouro");
      setValidState("logradouro", true);
    }
    if (bairro) {
      bairroInput.value = bairro;
      clearError("bairro");
      setValidState("bairro", true);
    }
    if (cidade) cidadeInput.value = cidade;
    if (uf) ufInput.value = uf;

    statusEl.textContent = "✓ Endereço encontrado";
    statusEl.className = "cep-status success";
    updateFormProgress();
  }
}

/* =========================================================
   4. BUSCA INTELIGENTE DE ESCOLAS DE MANAUS SEM EXIGIR SIGLAS
   ========================================================= */
function normalizeSearchText(str) {
  return String(str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[-_./,()']/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function simplifyPhonetic(str) {
  return normalizeSearchText(str)
    .replace(/ll/g, "l")
    .replace(/ss/g, "s")
    .replace(/tt/g, "t")
    .replace(/nn/g, "n")
    .replace(/ph/g, "f")
    .replace(/th/g, "t")
    .replace(/y/g, "i")
    .replace(/w/g, "v");
}

function stripSchoolPrefixes(str) {
  return normalizeSearchText(str)
    .replace(
      /\b(cemei|cmei|ceti|cmpm|cmm|ee|em|e e|e m|escola|estadual|municipal|colegio|centro|educacional|integrado|tempo|integral|educacao|infantil|professor|professora|prof|doutor|doutora|dr|dra|senador|deputado|padre|irma|irmao|dom|dona|poeta|escritor|engenheiro|eng|maestro|coronel|tenente|general|presidente|prefeito|governador|de|da|do|das|dos)\b/g,
      " "
    )
    .replace(/\s+/g, " ")
    .trim();
}

function classifySchoolNetwork(name) {
  const n = normalizeSearchText(name);
  if (/\bcmpm\b|\bmilitar\b|\bcmm\b/.test(n)) return "Militar";
  if (/\bcemei\b|\bcmei\b|\bmunicipal\b|\bsemed\b|\be m\b/.test(n)) return "Municipal (SEMED)";
  if (/\bceti\b|\bestadual\b|\bseduc\b|\be e\b/.test(n)) return "Estadual (SEDUC)";
  if (/\bifam\b|\bfederal\b/.test(n)) return "Federal";
  return "Manaus - AM";
}

function getTagColorClass(rede) {
  const r = String(rede || "").toLowerCase();
  if (r.includes("semed") || r.includes("municipal")) return "tag-semed";
  if (r.includes("seduc") || r.includes("estadual")) return "tag-seduc";
  if (r.includes("militar")) return "tag-militar";
  return "";
}

function addSchoolsToMemory(newSchools) {
  const existingKeys = new Set(
    todasEscolasManaus.map((s) => simplifyPhonetic(s.nome))
  );

  for (const item of newSchools) {
    const cleanName = (item.nome || "").trim();
    if (cleanName.length < 4) continue;
    const key = simplifyPhonetic(cleanName);
    if (!existingKeys.has(key)) {
      existingKeys.add(key);
      todasEscolasManaus.push({
        nome: cleanName,
        rede: item.rede || classifySchoolNetwork(cleanName)
      });
    }
  }
}

async function preloadAllManausSchoolsSafe() {
  const apiStatus = document.getElementById("schoolApiStatus");
  const overpassQuery = `[out:json][timeout:12];(node["amenity"~"school|kindergarten|college"](-3.18,-60.15,-2.90,-59.82);way["amenity"~"school|kindergarten|college"](-3.18,-60.15,-2.90,-59.82););out tags;`;

  try {
    const url = `https://overpass.kumi.systems/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
    const res = await fetch(url);
    if (!res.ok) return;
    const data = await res.json();
    if (!data || !Array.isArray(data.elements)) return;

    const fetched = [];
    for (const el of data.elements) {
      if (el.tags && el.tags.name) {
        fetched.push({
          nome: el.tags.name,
          rede: classifySchoolNetwork(el.tags.name)
        });
      }
    }

    addSchoolsToMemory(fetched);
    if (apiStatus) {
      apiStatus.textContent = `${todasEscolasManaus.length} escolas de Manaus`;
    }
  } catch {
    // Silencioso caso offline
  }
}

function searchSchoolsInMemory(rawQuery) {
  const queryNorm = normalizeSearchText(rawQuery);
  const queryCore = stripSchoolPrefixes(rawQuery) || queryNorm;
  const queryPhonetic = simplifyPhonetic(queryCore);
  const queryTokens = queryPhonetic.split(" ").filter((t) => t.length >= 2);

  if (!queryNorm) return [];

  const scored = [];

  for (const school of todasEscolasManaus) {
    const fullNorm = normalizeSearchText(school.nome);
    const coreNorm = stripSchoolPrefixes(school.nome);
    const fullPhonetic = simplifyPhonetic(school.nome);
    const corePhonetic = simplifyPhonetic(coreNorm);

    let score = 0;

    if (coreNorm.startsWith(queryCore) || corePhonetic.startsWith(queryPhonetic)) {
      score += 120;
    } else if (coreNorm.includes(queryCore) || corePhonetic.includes(queryPhonetic)) {
      score += 100;
    } else if (fullNorm.includes(queryNorm) || fullPhonetic.includes(queryPhonetic)) {
      score += 85;
    }

    if (queryTokens.length > 0) {
      let matchedTokens = 0;
      for (const token of queryTokens) {
        if (corePhonetic.includes(token) || fullPhonetic.includes(token)) {
          matchedTokens++;
        }
      }
      if (matchedTokens === queryTokens.length) {
        score += 75;
      } else if (matchedTokens > 0 && queryTokens.length > 1) {
        score += (matchedTokens / queryTokens.length) * 35;
      }
    }

    if (score > 0) {
      scored.push({ school, score });
    }
  }

  scored.sort((a, b) => b.score - a.score || a.school.nome.localeCompare(b.school.nome));
  return scored.slice(0, 8).map((s) => s.school);
}

function initSchoolAutocomplete() {
  const input = document.getElementById("escolaInput");
  const list = document.getElementById("escolaSuggestions");
  const clearBtn = document.getElementById("clearEscolaBtn");
  const apiStatus = document.getElementById("schoolApiStatus");
  const wrapper = document.getElementById("schoolFieldWrapper");

  if (!input || !list) return;

  input.addEventListener("focus", () => {
    if (window.innerWidth < 768 && wrapper) {
      setTimeout(() => {
        wrapper.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 220);
    }
  });

  input.addEventListener("input", () => {
    clearError("escola");
    const query = input.value.trim();
    clearBtn.hidden = query.length === 0;
    activeSuggestionIndex = -1;
    updateFormProgress();

    if (query.length < 2) {
      list.hidden = true;
      input.setAttribute("aria-expanded", "false");
      return;
    }

    const instantMatches = searchSchoolsInMemory(query);
    renderSuggestions(instantMatches, query);

    clearTimeout(apiDebounceTimer);
    if (query.length >= 3) {
      apiDebounceTimer = setTimeout(() => {
        fetchLiveManausSchoolsByKeyword(query);
      }, 280);
    }
  });

  input.addEventListener("keydown", (e) => {
    if (list.hidden) return;
    const items = list.querySelectorAll(".suggestion-item");
    if (!items.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeSuggestionIndex = (activeSuggestionIndex + 1) % items.length;
      updateActiveSuggestion(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeSuggestionIndex = (activeSuggestionIndex - 1 + items.length) % items.length;
      updateActiveSuggestion(items);
    } else if (e.key === "Enter" && activeSuggestionIndex >= 0) {
      e.preventDefault();
      items[activeSuggestionIndex].click();
    } else if (e.key === "Escape") {
      list.hidden = true;
      input.setAttribute("aria-expanded", "false");
    }
  });

  function updateActiveSuggestion(items) {
    items.forEach((el, idx) => {
      el.classList.toggle("active", idx === activeSuggestionIndex);
      if (idx === activeSuggestionIndex) {
        el.scrollIntoView({ block: "nearest" });
      }
    });
  }

  async function fetchLiveManausSchoolsByKeyword(query) {
    if (apiAbortController) {
      apiAbortController.abort();
    }
    apiAbortController = new AbortController();

    try {
      apiStatus.textContent = "Buscando em Manaus...";
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        query + " Manaus"
      )}&countrycodes=br&limit=8`;

      const res = await fetch(nominatimUrl, {
        signal: apiAbortController.signal,
        headers: { "Accept-Language": "pt-BR" }
      });

      if (!res.ok) throw new Error("Falha Nominatim");
      const data = await res.json();

      const discovered = [];
      for (const place of data) {
        const rawName = (place.name || (place.display_name || "").split(",")[0] || "").trim();
        const isEducationType =
          place.type === "school" ||
          place.type === "kindergarten" ||
          place.type === "college" ||
          /escola|col[eé]gio|cemei|cmei|ceti|cmpm|instituto|centro educacional|creche/i.test(
            rawName
          );

        if (rawName && isEducationType) {
          discovered.push({
            nome: rawName,
            rede: classifySchoolNetwork(rawName)
          });
        }
      }

      if (discovered.length > 0) {
        addSchoolsToMemory(discovered);
      }

      const updatedMatches = searchSchoolsInMemory(input.value.trim());
      renderSuggestions(updatedMatches, input.value.trim());
      apiStatus.textContent = `${todasEscolasManaus.length} escolas de Manaus`;
    } catch (err) {
      if (err.name !== "AbortError") {
        apiStatus.textContent = `${todasEscolasManaus.length} escolas de Manaus`;
      }
    }
  }

  function highlightMatch(schoolName, rawQuery) {
    const safeName = escapeHtml(schoolName);
    const tokens = rawQuery
      .trim()
      .split(/\s+/)
      .filter((t) => t.length >= 2)
      .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

    if (tokens.length === 0) return safeName;
    const regex = new RegExp(`(${tokens.join("|")})`, "gi");
    return safeName.replace(regex, "<mark>$1</mark>");
  }

  function renderSuggestions(items, rawQuery) {
    list.innerHTML = "";

    if (items.length === 0) {
      const liCustom = document.createElement("li");
      liCustom.className = "suggestion-item";
      liCustom.innerHTML = `
        <span class="suggestion-name">Usar: "${escapeHtml(rawQuery)}"</span>
        <span class="suggestion-tag">Digitação livre</span>
      `;
      liCustom.addEventListener("click", () => selectSchool(rawQuery));
      list.appendChild(liCustom);
    } else {
      items.forEach((item) => {
        const li = document.createElement("li");
        li.className = "suggestion-item";
        li.setAttribute("role", "option");
        const colorClass = getTagColorClass(item.rede);
        li.innerHTML = `
          <span class="suggestion-name">${highlightMatch(item.nome, rawQuery)}</span>
          <span class="suggestion-tag ${colorClass}">${escapeHtml(item.rede)}</span>
        `;
        li.addEventListener("click", () => selectSchool(item.nome));
        list.appendChild(li);
      });
    }

    list.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  function selectSchool(schoolName) {
    input.value = schoolName;
    list.hidden = true;
    input.setAttribute("aria-expanded", "false");
    clearBtn.hidden = false;
    clearError("escola");
    input.classList.add("input-valid");
    updateFormProgress();
  }

  clearBtn.addEventListener("click", () => {
    input.value = "";
    input.classList.remove("input-valid");
    clearBtn.hidden = true;
    list.hidden = true;
    updateFormProgress();
    input.focus();
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".school-autocomplete-wrapper")) {
      list.hidden = true;
      input.setAttribute("aria-expanded", "false");
    }
  });
}

/* =========================================================
   5. FEEDBACK VISUAL EM TEMPO REAL & BARRA DE PROGRESSO
   ========================================================= */
function setValidState(fieldId, isValid) {
  const input = document.getElementById(fieldId);
  const check = document.getElementById(`valid-${fieldId}`);
  if (input) {
    input.classList.toggle("input-valid", Boolean(isValid));
    if (isValid) input.classList.remove("input-error");
  }
  if (check) {
    check.classList.toggle("show", Boolean(isValid));
  }
}

function initLiveValidationAndProgress() {
  const nomeInput = document.getElementById("nomeCompleto");
  const emailInput = document.getElementById("email");
  const bairroInput = document.getElementById("bairro");
  const logradouroInput = document.getElementById("logradouro");

  nomeInput.addEventListener("input", () => {
    clearError("nomeCompleto");
    const val = nomeInput.value.trim();
    setValidState("nomeCompleto", val.length >= 5 && val.includes(" "));
    updateFormProgress();
  });

  emailInput.addEventListener("input", () => {
    clearError("email");
    const val = emailInput.value.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    setValidState("email", ok);
    updateFormProgress();
  });

  bairroInput.addEventListener("input", () => {
    clearError("bairro");
    setValidState("bairro", bairroInput.value.trim().length >= 2);
    updateFormProgress();
  });

  logradouroInput.addEventListener("input", () => {
    clearError("logradouro");
    setValidState("logradouro", logradouroInput.value.trim().length >= 3);
    updateFormProgress();
  });
}

function updateFormProgress() {
  const nomeOk =
    document.getElementById("nomeCompleto").value.trim().length >= 5 &&
    document.getElementById("nomeCompleto").value.trim().includes(" ");
  const dataOk = Boolean(parseBrDate(document.getElementById("dataNascimento").value));
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    document.getElementById("email").value.trim()
  );

  const nonoRadio = document.querySelector('input[name="estaNoNonoAno"]:checked');
  let escolaridadeOk = false;
  if (nonoRadio) {
    if (nonoRadio.value === "sim") {
      escolaridadeOk = true;
    } else {
      escolaridadeOk =
        Boolean(document.getElementById("serieAtual").value) &&
        document.getElementById("cienteTreineiro").checked;
    }
  }

  const escolaOk = document.getElementById("escolaInput").value.trim().length >= 3;
  const cepOk = document.getElementById("cep").value.replace(/\D/g, "").length === 8;
  const enderecoOk =
    document.getElementById("bairro").value.trim().length >= 2 &&
    document.getElementById("logradouro").value.trim().length >= 3;

  const checks = [nomeOk, dataOk, emailOk, escolaridadeOk, escolaOk, cepOk, enderecoOk];
  const completed = checks.filter(Boolean).length;
  const pct = Math.round((completed / checks.length) * 100);

  const fill = document.getElementById("progressFill");
  const label = document.getElementById("progressLabel");
  if (fill) fill.style.width = `${pct}%`;
  if (label) {
    label.textContent = pct === 100 ? "✓ Tudo pronto para enviar!" : `${pct}% preenchido`;
  }
}

/* =========================================================
   6. COMUNICAÇÃO SEGURA COM BACKEND (/api/inscricao)
      (ZERO CREDENCIAIS EXPOSTAS NO ARQUIVO JS)
   ========================================================= */
async function enviarInscricaoSegura(registrationData, websiteHp) {
  const isLocalhost =
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

  // 1ª Rota: Em Produção (Vercel), usa o Backend Serverless (/api/inscricao)
  if (!isLocalhost) {
    try {
      const apiRes = await fetch("/api/inscricao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...registrationData,
          website_hp: websiteHp,
          formLoadedAt: FORM_LOADED_AT
        })
      });

      const contentType = apiRes.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const result = await apiRes.json();
        if (apiRes.ok && result.ok) {
          return { ok: true, id: result.id, data: result.data };
        }
        return {
          ok: false,
          status: result.status || String(apiRes.status),
          message: result.error || "Erro ao processar inscrição."
        };
      }
    } catch {
      return {
        ok: false,
        status: "SERVER_ERROR",
        message: "Serviço temporariamente indisponível."
      };
    }
  }

  // 2ª Rota: Em localhost, lê diretamente o .env local via local_server.py (sem dar 501 no console)

  try {
    const cfgRes = await fetch("/api/local-config", { cache: "no-store" });
    if (!cfgRes.ok) {
      throw new Error("Arquivo .env local não encontrado pelo local_server.py");
    }
    const cfg = await cfgRes.json();

    const fields = {};
    for (const [k, v] of Object.entries(registrationData)) {
      if (typeof v === "boolean") {
        fields[k] = { booleanValue: v };
      } else if (v === null || v === undefined) {
        fields[k] = { nullValue: null };
      } else {
        fields[k] = { stringValue: String(v) };
      }
    }
    fields.criadoEm = { timestampValue: new Date().toISOString() };

    const restUrl = `https://firestore.googleapis.com/v1/projects/${cfg.projectId}/databases/${cfg.databaseId}/documents/${cfg.collection}?key=${cfg.apiKey}`;
    const fbRes = await fetch(restUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields })
    });

    if (fbRes.ok) {
      const doc = await fbRes.json();
      const parts = (doc.name || "").split("/");
      return { ok: true, id: parts[parts.length - 1] || "salvo" };
    }

    const errJson = await fbRes.json().catch(() => ({}));
    return {
      ok: false,
      status: (errJson.error && errJson.error.status) || String(fbRes.status),
      message: (errJson.error && errJson.error.message) || `HTTP ${fbRes.status}`
    };
  } catch (localErr) {
    return {
      ok: false,
      status: "LOCAL_ENV_ERROR",
      message: localErr.message || String(localErr)
    };
  }
}

function initFormSubmission() {
  const form = document.getElementById("registrationForm");
  const submitBtn = document.getElementById("submitBtn");
  const submitBtnText = submitBtn ? submitBtn.querySelector("span") : null;
  const modal = document.getElementById("successModal");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const downloadReceiptBtn = document.getElementById("downloadReceiptBtn");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Proteção Anti-Bot Honeypot
    const hpInput = document.getElementById("website_hp");
    if (hpInput && hpInput.value.trim() !== "") {
      return;
    }

    // Proteção Anti-Flood (Cooldown de 15s entre submissões no mesmo navegador)
    const lastSub = Number(sessionStorage.getItem(COOLDOWN_KEY) || 0);
    if (Date.now() - lastSub < 15000) {
      alert("Aguarde alguns segundos antes de enviar uma nova inscrição.");
      return;
    }

    if (!validateForm()) return;

    const nonoAnoRadio = document.querySelector('input[name="estaNoNonoAno"]:checked');
    const isNonoAno = nonoAnoRadio && nonoAnoRadio.value === "sim";

    const registrationData = {
      protocolo: gerarProtocolo(),
      dataHoraInscricao: new Date().toLocaleString("pt-BR"),
      nomeCompleto: sanitizeInput(document.getElementById("nomeCompleto").value, 140),
      dataNascimento: sanitizeInput(document.getElementById("dataNascimento").value, 10),
      email: sanitizeInput(document.getElementById("email").value, 120).toLowerCase(),
      estaNoNonoAno2026: isNonoAno,
      modalidadeProva: isNonoAno ? "Candidato Oficial (9º Ano em 2026)" : "TREINEIRO(A)",
      serieAtual: isNonoAno
        ? "9º Ano do Ensino Fundamental"
        : sanitizeInput(document.getElementById("serieAtual").value, 60),
      cienteTreineiro: !isNonoAno ? document.getElementById("cienteTreineiro").checked : null,
      escola: sanitizeInput(document.getElementById("escolaInput").value, 160),
      cep: sanitizeInput(document.getElementById("cep").value, 9),
      logradouro: sanitizeInput(document.getElementById("logradouro").value, 160),
      bairro: sanitizeInput(document.getElementById("bairro").value, 100),
      cidade: sanitizeInput(document.getElementById("cidade").value, 80),
      uf: sanitizeInput(document.getElementById("uf").value, 2).toUpperCase(),
      evento: "1º Aulão Preparatório FMM - 21/11/2026",
      capitulo: "Capítulo Filhos das Águas nº 926 - AM"
    };

    try {
      if (submitBtn) submitBtn.disabled = true;
      if (submitBtnText) submitBtnText.textContent = "SALVANDO INSCRIÇÃO...";

      const result = await enviarInscricaoSegura(
        registrationData,
        hpInput ? hpInput.value : ""
      );

      if (!result.ok) {
        if (result.status === "PERMISSION_DENIED" || /permission/i.test(result.message)) {
          alert(
            "As Regras de Segurança do Firestore estão bloqueando a gravação.\nNo painel do Firebase > Firestore > Segurança, configure a regra de validação da coleção inscricoes_aulao_fmm."
          );
          return;
        }
        alert(`Não foi possível concluir a inscrição (${result.status}):\n${result.message}`);
        return;
      }

      sessionStorage.setItem(COOLDOWN_KEY, String(Date.now()));
      registrationData.firebaseDocId = result.id;
      salvarInscricaoLocal(registrationData);
      lastRegistration = registrationData;
      exibirModalSucesso(registrationData, isNonoAno);
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      if (submitBtnText) submitBtnText.textContent = "CONFIRMAR MINHA INSCRIÇÃO";
    }
  });

  closeModalBtn.addEventListener("click", () => {
    modal.hidden = true;
    form.reset();
    document.getElementById("treineiroAlert").hidden = true;
    const helper = document.getElementById("idadeCalculada");
    helper.textContent = "Digite apenas os números (ex: 15042012)";
    helper.classList.remove("age-badge");
    document.getElementById("cepStatus").textContent = "";
    document.getElementById("clearEscolaBtn").hidden = true;
    document.querySelectorAll(".input-valid").forEach((el) => el.classList.remove("input-valid"));
    document.querySelectorAll(".valid-check.show").forEach((el) => el.classList.remove("show"));
    updateFormProgress();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  downloadReceiptBtn.addEventListener("click", () => {
    if (!lastRegistration) return;
    gerarComprovantePdf(lastRegistration);
  });
}

function validateForm() {
  let firstErrorEl = null;

  function fail(fieldId, msg, targetEl) {
    setError(fieldId, msg);
    if (!firstErrorEl) {
      firstErrorEl = targetEl || document.getElementById(fieldId);
    }
  }

  const nome = document.getElementById("nomeCompleto").value.trim();
  if (nome.length < 5 || !nome.includes(" ")) {
    fail("nomeCompleto", "Informe seu nome e sobrenome completos.");
  } else {
    clearError("nomeCompleto");
  }

  const dataNascVal = document.getElementById("dataNascimento").value.trim();
  if (!parseBrDate(dataNascVal)) {
    fail("dataNascimento", "Digite sua data de nascimento no formato DD/MM/AAAA.");
  } else {
    clearError("dataNascimento");
  }

  const email = document.getElementById("email").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    fail("email", "Informe um endereço de e-mail válido.");
  } else {
    clearError("email");
  }

  const nonoAnoChecked = document.querySelector('input[name="estaNoNonoAno"]:checked');
  if (!nonoAnoChecked) {
    fail(
      "estaNoNonoAno",
      "Selecione se você está ou não no 9º ano em 2026.",
      document.getElementById("labelNonoAno")
    );
  } else {
    clearError("estaNoNonoAno");
    if (nonoAnoChecked.value === "nao") {
      const serieAtual = document.getElementById("serieAtual").value;
      const ciente = document.getElementById("cienteTreineiro").checked;
      if (!serieAtual) {
        fail("serieAtual", "Selecione a série que você está cursando em 2026.");
      } else {
        clearError("serieAtual");
      }
      if (!ciente) {
        fail(
          "cienteTreineiro",
          "Marque a caixa confirmando ciência de participação como treineiro(a).",
          document.getElementById("cienteTreineiro")
        );
      } else {
        clearError("cienteTreineiro");
      }
    }
  }

  const escola = document.getElementById("escolaInput").value.trim();
  if (escola.length < 3) {
    fail("escola", "Informe o nome da escola onde você estuda.", document.getElementById("escolaInput"));
  } else {
    clearError("escola");
  }

  const cepDigits = document.getElementById("cep").value.replace(/\D/g, "");
  if (cepDigits.length !== 8) {
    fail("cep", "Digite um CEP válido com 8 números.");
  } else {
    clearError("cep");
  }

  const bairro = document.getElementById("bairro").value.trim();
  if (!bairro) {
    fail("bairro", "Informe seu bairro.");
  } else {
    clearError("bairro");
  }

  const logradouro = document.getElementById("logradouro").value.trim();
  if (!logradouro) {
    fail("logradouro", "Informe sua rua ou avenida.");
  } else {
    clearError("logradouro");
  }

  if (firstErrorEl) {
    firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
    if (typeof firstErrorEl.focus === "function") {
      setTimeout(() => firstErrorEl.focus({ preventScroll: true }), 250);
    }
    return false;
  }

  return true;
}

function setError(fieldId, message) {
  const errSpan = document.getElementById(`erro-${fieldId}`);
  if (errSpan) errSpan.textContent = message;
  const input = document.getElementById(fieldId === "escola" ? "escolaInput" : fieldId);
  if (input) {
    input.classList.add("input-error");
    input.classList.remove("input-valid");
  }
}

function clearError(fieldId) {
  const errSpan = document.getElementById(`erro-${fieldId}`);
  if (errSpan) errSpan.textContent = "";
  const input = document.getElementById(fieldId === "escola" ? "escolaInput" : fieldId);
  if (input) input.classList.remove("input-error");
}

function exibirModalSucesso(data, isNonoAno) {
  const modal = document.getElementById("successModal");
  const modeTag = document.getElementById("modalModeTag");
  const summaryBox = document.getElementById("inscriptionSummary");

  if (isNonoAno) {
    modeTag.textContent = "MODALIDADE: 9º ANO (CONCORRENTE OFICIAL)";
    modeTag.className = "modal-tag";
  } else {
    modeTag.textContent = "MODALIDADE: TREINEIRO(A)";
    modeTag.className = "modal-tag tag-treineiro";
  }

  summaryBox.innerHTML = `
    <div class="summary-row"><span>Protocolo:</span><strong>${escapeHtml(data.protocolo)}</strong></div>
    <div class="summary-row"><span>Aluno(a):</span><strong>${escapeHtml(data.nomeCompleto)}</strong></div>
    <div class="summary-row"><span>Série / Status:</span><strong>${escapeHtml(data.serieAtual)} (${isNonoAno ? "Oficial" : "Treineiro"})</strong></div>
    <div class="summary-row"><span>Escola:</span><strong>${escapeHtml(data.escola)}</strong></div>
    <div class="summary-row"><span>E-mail:</span><strong>${escapeHtml(data.email)}</strong></div>
    <div class="summary-row"><span>Endereço:</span><strong>${escapeHtml(data.bairro)} - ${escapeHtml(data.cidade)}/${escapeHtml(data.uf)} (${escapeHtml(data.cep)})</strong></div>
  `;

  modal.hidden = false;
}

function gerarProtocolo() {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `FMM926-2026-${rand}`;
}

function salvarInscricaoLocal(registro) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const lista = raw ? JSON.parse(raw) : [];
    lista.push(registro);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lista));
  } catch {
    // Ignora erro de storage privado
  }
}

/* =========================================================
   7. GERADOR DE COMPROVANTE OFICIAL EM PDF (COM BRASÃO E DESIGN PREMIUM)
   ========================================================= */
function preloadChapterLogoForPdf() {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = () => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || 300;
      canvas.height = img.naturalHeight || 300;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      cachedLogoDataUrl = canvas.toDataURL("image/png");
    } catch {
      cachedLogoDataUrl = null;
    }
  };
  img.src = "assets/logo-capitulo.png";
}

function gerarComprovantePdf(d) {
  const jspdfLib = window.jspdf;
  if (!jspdfLib || !jspdfLib.jsPDF) {
    alert("Biblioteca de PDF ainda carregando. Tente novamente em um instante.");
    return;
  }

  const doc = new jspdfLib.jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageW = 210;
  const pageH = 297;

  // Fundo suave da página
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, pageW, pageH, "F");

  // Moldura externa dupla institucional
  doc.setDrawColor(9, 30, 90);
  doc.setLineWidth(1.2);
  doc.rect(8, 8, pageW - 16, pageH - 16);
  doc.setDrawColor(227, 185, 75); // Dourado DeMolay
  doc.setLineWidth(0.5);
  doc.rect(10, 10, pageW - 20, pageH - 20);

  // Cabeçalho Azul-Marinho
  doc.setFillColor(6, 19, 56);
  doc.rect(10, 10, pageW - 20, 42, "F");

  // Faixa Verde-Limão Neon na base do cabeçalho
  doc.setFillColor(200, 255, 0);
  doc.rect(10, 50, pageW - 20, 3.5, "F");

  // Brasão do Capítulo no Cabeçalho
  if (cachedLogoDataUrl) {
    try {
      doc.addImage(cachedLogoDataUrl, "PNG", 16, 14, 30, 30);
    } catch {
      // Continua caso imagem falhe
    }
  }

  const textStartX = cachedLogoDataUrl ? 51 : 18;

  // Textos do Cabeçalho
  doc.setTextColor(227, 185, 75); // Dourado
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("ORDEM DEMOLAY • SUPREMO CONSELHO DEMOLAY BRASIL (SCDB)", textStartX, 22);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14.5);
  doc.text("CAPÍTULO FILHOS DAS ÁGUAS Nº 926", textStartX, 30);

  doc.setTextColor(200, 255, 0);
  doc.setFontSize(10);
  doc.text("GRANDE CONSELHO ESTADUAL DO AMAZONAS (GCE-AM) • MANAUS/AM", textStartX, 37);

  doc.setTextColor(203, 213, 225);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text("Projeto Solidário de Educação • Preparatório Fundação Matias Machline", textStartX, 43);

  // Título Principal do Comprovante
  doc.setTextColor(6, 19, 56);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("COMPROVANTE OFICIAL DE INSCRIÇÃO", pageW / 2, 66, { align: "center" });

  doc.setTextColor(11, 70, 228);
  doc.setFontSize(11);
  doc.text("1º AULÃO PREPARATÓRIO — FUNDAÇÃO MATIAS MACHLINE (FMM)", pageW / 2, 73, {
    align: "center"
  });

  // Card de Protocolo e Autenticação
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.5);
  doc.roundedRect(16, 80, pageW - 32, 26, 3, 3, "FD");

  // Destaque lateral azul no card de protocolo
  doc.setFillColor(11, 70, 228);
  doc.roundedRect(16, 80, 5, 26, 2, 2, "F");

  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("PROTOCOLO DE INSCRIÇÃO", 26, 88);

  doc.setTextColor(6, 19, 56);
  doc.setFontSize(15);
  doc.text(String(d.protocolo || "-"), 26, 97);

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8);
  doc.text(`Data/Hora do Registro: ${d.dataHoraInscricao || "-"}`, 26, 103);

  // Selo de Modalidade (Direita do card de protocolo)
  const isOficial = Boolean(d.estaNoNonoAno2026);
  if (isOficial) {
    doc.setFillColor(220, 252, 231);
    doc.setDrawColor(22, 163, 74);
    doc.roundedRect(116, 85, 72, 16, 2.5, 2.5, "FD");
    doc.setTextColor(22, 101, 52);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("INSCRIÇÃO CONFIRMADA", 152, 91.5, { align: "center" });
    doc.setFontSize(9.5);
    doc.text("CONCORRENTE OFICIAL (9º ANO)", 152, 97.5, { align: "center" });
  } else {
    doc.setFillColor(254, 243, 199);
    doc.setDrawColor(217, 119, 6);
    doc.roundedRect(116, 85, 72, 16, 2.5, 2.5, "FD");
    doc.setTextColor(146, 64, 14);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.text("MODALIDADE ESPECIAL", 152, 91.5, { align: "center" });
    doc.setFontSize(9.5);
    doc.text("PARTICIPANTE TREINEIRO(A)", 152, 97.5, { align: "center" });
  }

  // Seção 1: Dados do EstudanteInscrito
  let y = 116;
  doc.setFillColor(9, 30, 90);
  doc.roundedRect(16, y, pageW - 32, 9, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("1. DADOS DO(A) ESTUDANTE INSCRITO(A)", 21, y + 6);

  y += 9;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.rect(16, y, pageW - 32, 74, "FD");

  const rows = [
    ["Nome Completo:", d.nomeCompleto || "-"],
    ["Data de Nascimento:", d.dataNascimento || "-"],
    ["E-mail Cadastrado:", d.email || "-"],
    ["Série em 2026:", d.serieAtual || "-"],
    ["Modalidade na Prova:", d.modalidadeProva || "-"],
    ["Instituição de Ensino:", d.escola || "-"],
    ["Endereço Residencial:", `${d.logradouro || ""}, ${d.bairro || ""}`],
    ["Cidade / UF / CEP:", `${d.cidade || "Manaus"} / ${d.uf || "AM"} — CEP: ${d.cep || "-"}`]
  ];

  let rowY = y + 8;
  rows.forEach(([label, val], idx) => {
    if (idx % 2 === 1) {
      doc.setFillColor(248, 250, 252);
      doc.rect(16.5, rowY - 5.5, pageW - 33, 8.5, "F");
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(label, 21, rowY);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    const maxValWidth = pageW - 88;
    const clippedVal = doc.splitTextToSize(String(val), maxValWidth)[0] || "-";
    doc.text(clippedVal, 68, rowY);

    rowY += 8.8;
  });

  // Seção 2: Detalhes do Evento e Cronograma
  y = 207;
  doc.setFillColor(9, 30, 90);
  doc.roundedRect(16, y, pageW - 32, 9, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("2. INFORMAÇÕES E PROGRAMAÇÃO DO 1º AULÃO SOLIDÁRIO", 21, y + 6);

  y += 9;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.rect(16, y, pageW - 32, 42, "FD");

  // Card de Data dentro da programação
  doc.setFillColor(11, 70, 228);
  doc.roundedRect(21, y + 5, 44, 32, 2.5, 2.5, "F");
  doc.setTextColor(200, 255, 0);
  doc.setFontSize(8);
  doc.text("DATA DO EVENTO", 43, y + 12, { align: "center" });
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.text("21", 43, y + 22, { align: "center" });
  doc.setFontSize(8.5);
  doc.text("DE NOVEMBRO", 43, y + 28, { align: "center" });
  doc.setFontSize(7.5);
  doc.text("(SÁBADO)", 43, y + 33, { align: "center" });

  // Grade de disciplinas
  doc.setTextColor(6, 19, 56);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Formato: 100% Online e Totalmente Gratuito", 71, y + 11);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text("• Matemática — Resolução comentada de questões FMM (Duração: 1 hora)", 71, y + 19);
  doc.text("• Língua Portuguesa — Interpretação e Gramática FMM (Duração: 1 hora)", 71, y + 26);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.2);
  doc.setTextColor(11, 70, 228);
  doc.text(
    "Importante: O link de acesso à transmissão será enviado para o e-mail cadastrado.",
    71,
    y + 34
  );

  // Rodapé de Autenticidade Digital
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(16, 263, pageW - 32, 18, 2, 2, "FD");

  doc.setTextColor(71, 85, 105);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text(
    `AUTENTICAÇÃO DIGITAL FIREBASE: ${d.firebaseDocId || "VERIFICADO"}   |   PROTOCOLO: ${d.protocolo}`,
    pageW / 2,
    270,
    { align: "center" }
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(
    "Capítulo Filhos das Águas nº 926 da Ordem DeMolay • Manaus - Amazonas • https://filhosdasaguas.vercel.app",
    pageW / 2,
    276,
    { align: "center" }
  );

  doc.save(`Comprovante_${d.protocolo}.pdf`);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
