"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nunjucks_1 = __importDefault(require("nunjucks"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const PORT = 3000;
const server = (0, express_1.default)();
// Configuração de middlewares
server.use('/static', express_1.default.static("./src/static"));
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
// Configuração do Nunjucks
server.set("view engine", "njk");
nunjucks_1.default.configure("./src/views", {
    express: server,
    autoescape: false,
    noCache: true,
});
// Função para carregar o JSON
const loadSimulations = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    }
    catch (err) {
        console.error('Erro ao carregar o arquivo JSON:', err);
        return null;
    }
};
const loadArticle = (filePath) => {
    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    }
    catch (err) {
        console.error('Erro ao carregar o arquivo JSON:', err);
        return null;
    }
};
const readFileAsync = (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};
function stringToSlug(title) {
    return title
        .toLowerCase() // Transforma em minúsculas
        .normalize("NFD") // Separa caracteres com acentos
        .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
        .replace(/[^a-z0-9]+/g, "-") // Substitui caracteres não alfanuméricos por "-"
        .replace(/^-+|-+$/g, ""); // Remove traços extras do início e fim
}
function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
}
function capitalizePrhase(phrase) {
    let listWords = phrase.split(' ');
    listWords = listWords.map(word => capitalizeFirstLetter(word));
    return listWords.join(" ");
}
function slugToString(url) {
    let title = decodeURIComponent(url) // Decodifica a URL
        .replace(/-/g, " ") // Substitui traços por espaços
        .replace(/^\s+|\s+$/g, "") // Remove espaços extras no início e no fim
        .toLowerCase(); // Transforma em minúsculas
    return capitalizePrhase(title);
}
/*-------------------------------------------------------------*/
// Rotas
server.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const article_db = path.join("./src/db/article_db/doc_db.json");
    const dataArticles_ = loadSimulations(article_db);
    const dataArticles = dataArticles_.map(article => {
        return Object.assign(Object.assign({}, article), { key: slugToString(article.title) // Adiciona ou atualiza a propriedade `key`
         });
    });
    const simsDb = path.join("./src/db/sims_db/simsData.json");
    const dataSimulations = loadSimulations(simsDb);
    res.render('index', { articles: dataArticles,
        sims: dataSimulations,
        title: 'Simulações Da Filosofia Natural',
        message: 'Bem-vindo ao meu site!' });
}));
server.get('/about', (req, res) => {
    res.render('about', { title: 'Sobre Nós', message: 'Informações sobre nossa empresa.' });
});
server.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contato', message: 'Entre em contato conosco.' });
});
server.get("/sims/:sim_key", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sim_key = req.params.sim_key;
    const simsDb = path.join("./src/db/sims_db/simsData.json");
    const dataSimulations = loadSimulations(simsDb);
    const sim = dataSimulations.find(sim => sim.key === sim_key);
    const contentDataFile = path.join('./src', sim.content);
    const contentData = yield readFileAsync(contentDataFile);
    res.render("layouts/base_sim", { thumb: sim.thumb,
        title: sim.title,
        description: sim.description,
        contentSim: contentData });
}));
server.get("/article/:articleName", (req, res) => {
    const articleName = req.params.articleName;
    const article_db = path.join("./src/db/article_db/doc_db.json");
    const dataArticles = loadArticle(article_db);
    const articleTitle = slugToString(articleName);
    console.log(articleTitle);
    const article = dataArticles.find(article => article.title == articleTitle);
    if (!article) {
        res.status(404).send("Artigo não encontrado");
    }
    else {
        // Carregar dados do artigo
        const articleData = {
            title: article.title,
            date: article.date, // Pode ser dinamizado
            image: article.thumb,
            content: fs.readFileSync(path.join('./src/', `db/article_db/content/${article.key}`), "utf-8"),
        };
        res.render("layouts/base_article.njk", { article: articleData });
    }
});
// Iniciar o servidor
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map