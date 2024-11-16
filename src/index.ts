import express, { Express, Request, Response, NextFunction } from "express";
import nunjucks from "nunjucks";

const PORT = 3000;
const server: Express = express();

// Configuração de middlewares
server.use('/static',express.static(__dirname + "/static"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Configuração do Nunjucks
server.set("view engine", "njk");
nunjucks.configure("src/views", {
    express: server,
    autoescape: false,
    noCache: true,
});


// Rotas
server.get('/', (req: Request, res: Response) => {
  res.render('index', { title: 'Página Inicial', message: 'Bem-vindo ao meu site!' });
});

server.get('/about', (req: Request, res: Response) => {
  res.render('about', { title: 'Sobre Nós', message: 'Informações sobre nossa empresa.' });
});

server.get('/contact', (req: Request, res: Response) => {
  res.render('contact', { title: 'Contato', message: 'Entre em contato conosco.' });
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
