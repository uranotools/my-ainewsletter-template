// URL base para editar los posts en GitHub
// Cambia 'tu-usuario' y 'urano-ai-news-template' por tu usuario y repositorio reales.
export const GITHUB_POSTS_EDIT_URL = "https://github.com/uranotools/my-ainewsletter-template/edit/main/public/data/posts.json";

// URL para el archivo JSON con los datos de las noticias. 
// Al usar una ruta relativa ("./data/...") funciona perfectamente con HashRouter 
// y no depende del nombre del repositorio en GitHub Pages.
export const POSTS_JSON_URL = "./data/posts.json";
