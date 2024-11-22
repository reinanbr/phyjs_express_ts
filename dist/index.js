"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nunjucks_1 = __importDefault(require("nunjucks"));
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
// Rotas
server.get('/', (req, res) => {
    res.render('index', { title: 'Simulações Da Filosofia Natural', message: 'Bem-vindo ao meu site!' });
});
server.get('/about', (req, res) => {
    res.render('about', { title: 'Sobre Nós', message: 'Informações sobre nossa empresa.' });
});
server.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contato', message: 'Entre em contato conosco.' });
});
server.get("/sims/quanta", (req, res) => {
    res.render("sims/modernPhysics/quantumMechanics/tunelling/index");
});
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