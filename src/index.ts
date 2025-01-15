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

interface Article{
  key:string;
  title:string;
  thumb:string;
  date:string;
  hour:string;
  content:string;
  subtitle:string;
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



const loadArticle = (filePath: string): Article[] | null => {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data) as Article[];
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


function stringToSlug(title: string): string {
  return title
      .toLowerCase() // Transforma em minúsculas
      .normalize("NFD") // Separa caracteres com acentos
      .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
      .replace(/[^a-z0-9]+/g, "-") // Substitui caracteres não alfanuméricos por "-"
      .replace(/^-+|-+$/g, ""); // Remove traços extras do início e fim
}



function capitalizeFirstLetter(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function capitalizePrhase(phrase:string):string{
  let listWords = phrase.split(' ');
  listWords = listWords.map(word=>capitalizeFirstLetter(word));
  return listWords.join(" ");
}

function slugToString(url: string): string {
  let title = decodeURIComponent(url) // Decodifica a URL
  .replace(/-/g, " ") // Substitui traços por espaços
  .replace(/^\s+|\s+$/g, "") // Remove espaços extras no início e no fim
  .toLowerCase() // Transforma em minúsculas
  return capitalizePrhase(title);
}


/*-------------------------------------------------------------*/

// Rotas
server.get('/',async (req: Request, res: Response) => {
	const article_db:string = path.join("./src/db/article_db/doc_db.json");
	const dataArticles_ = loadSimulations(article_db);
  const dataArticles = dataArticles_.map(article => {
    return {
        ...article, // Mantém as propriedades existentes do objeto
        key: slugToString(article.title) // Adiciona ou atualiza a propriedade `key`
    };
});

  
	const simsDb: string = path.join("./src/db/sims_db/simsData.json");
	const dataSimulations = loadSimulations(simsDb);
 	
	res.render('index', {articles:dataArticles,
                      sims:dataSimulations,
                      title: 'Simulações Da Filosofia Natural',
                      message: 'Bem-vindo ao meu site!' });
});


server.get('/about', (req: Request, res: Response) => {
  res.render('about', { title: 'Sobre Nós', message: 'Informações sobre nossa empresa.' });
});


server.get('/contact', (req: Request, res: Response) => {
  res.render('contact', { title: 'Contato', message: 'Entre em contato conosco.' });
});


server.get("/sims/:sim_key", async (req:Request,res:Response)=>{
	const sim_key = req.params.sim_key;

	const simsDb: string = path.join("./src/db/sims_db/simsData.json");
	const dataSimulations = loadSimulations(simsDb); 
	const sim = dataSimulations.find(sim => sim.key === sim_key);

	const contentDataFile = path.join('./src',sim.content);	
	const contentData = await readFileAsync(contentDataFile);
	res.render("layouts/base_sim",{thumb:sim.thumb,
                                title:sim.title,
                                description:sim.description,
                                contentSim:contentData});
});



server.get("/article/:articleName", (req:Request, res: Response) => {
  const articleName = req.params.articleName;
  const article_db:string = path.join("./src/db/article_db/doc_db.json");
	const dataArticles = loadArticle(article_db);
  const articleTitle = slugToString(articleName);
  console.log(articleTitle);
  const article = dataArticles.find(article=>article.title==articleTitle);

  if (!article) {
   res.status(404).send("Artigo não encontrado");
  }else{
      // Carregar dados do artigo
  const articleData = {
    title:article.title,
    date: article.date, // Pode ser dinamizado
    image: article.thumb,
    content: fs.readFileSync(path.join('./src/', `db/article_db/content/${article.key}`), "utf-8"),
  };

  res.render("layouts/base_article.njk", { article: articleData });

  }});



// Iniciar o servidor
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
