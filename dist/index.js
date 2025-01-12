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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
/*-------------------------------------------------------------*/
// Rotas
server.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const article_db = path.join("./src/db/article_db/doc_db.json");
    const dataArticles = yield loadSimulations(article_db);
    const simsDb = path.join("./src//db/sims_db/simsData.json");
    const dataSimulations = yield loadSimulations(simsDb);
    res.render('index', { articles: dataArticles, sims: dataSimulations, title: 'Simulações Da Filosofia Natural', message: 'Bem-vindo ao meu site!' });
}));
server.get('/about', (req, res) => {
    res.render('about', { title: 'Sobre Nós', message: 'Informações sobre nossa empresa.' });
});
server.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contato', message: 'Entre em contato conosco.' });
});
server.get("/sims/:sim_key", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sim_key = req.params.sim_key;
    const simsDb = path.join(__dirname, "/db/sims_db/simsData.json");
    const dataSimulations = yield loadSimulations(simsDb);
    const sims = dataSimulations.find(sim => sim.key === sim_key);
    const contentDataFile = path.join(__dirname, sims.content);
    const contentData = yield readFileAsync(contentDataFile);
    res.render("layouts/base_sim", { thumb: sims.thumb, title: sims.title, description: sims.description, content: contentData });
}));
server.get('/sim/:area/:code_sim', (req, res) => {
    const { area, code_sim } = req.params;
    res.json({
        area: area,
        code_sim: code_sim
    });
});
// Iniciar o servidor
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map