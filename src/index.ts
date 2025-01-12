import express, { Express, Request, Response, NextFunction } from "express";
import nunjucks from "nunjucks";

import * as fs from 'fs';
import * as path from 'path';


const PORT = 3000;
const server: Express = express();

// Configuração de middlewares
server.use('/static',express.static("./src/static"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Configuração do Nunjucks
server.set("view engine", "njk");
nunjucks.configure("./src/views", {
    express: server,
    autoescape: false,
    noCache: true,
});



/*---------------------------------------------*/
interface Simulation {
  key:string;
  title: string;
  description: string;
  content:string;
  thumb:string;
}

// Função para carregar o JSON
const loadSimulations = (filePath: string): Simulation[] | null => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as Simulation[];
  } catch (err) {
    console.error('Erro ao carregar o arquivo JSON:', err);
    return null;
  }
};


const readFileAsync = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
/*-------------------------------------------------------------*/

// Rotas
server.get('/',async (req: Request, res: Response) => {
	const article_db:string = path.join("./src/db/article_db/doc_db.json");
	const dataArticles = await loadSimulations(article_db);

	const simsDb: string = path.join("./src//db/sims_db/simsData.json");
	const dataSimulations = await loadSimulations(simsDb); 
 	
	res.render('index', {articles:dataArticles,sims:dataSimulations, title: 'Simulações Da Filosofia Natural', message: 'Bem-vindo ao meu site!' });
});

server.get('/about', (req: Request, res: Response) => {
  res.render('about', { title: 'Sobre Nós', message: 'Informações sobre nossa empresa.' });
});

server.get('/contact', (req: Request, res: Response) => {
  res.render('contact', { title: 'Contato', message: 'Entre em contato conosco.' });
});


server.get("/sims/:sim_key", async (req:Request,res:Response)=>{
	const sim_key = req.params.sim_key;

	const simsDb: string = path.join(__dirname, "/db/sims_db/simsData.json");
	const dataSimulations = await loadSimulations(simsDb); 
	const sims = dataSimulations.find(sim => sim.key === sim_key);

	const contentDataFile = path.join(__dirname,sims.content);	
	const contentData = await readFileAsync(contentDataFile);
	res.render("layouts/base_sim",{thumb:sims.thumb,title:sims.title,description:sims.description,content:contentData});
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
