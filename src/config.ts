// URL base para editar los posts en GitHub
// Cambia 'tu-usuario' y 'urano-ai-news-template' por tu usuario y repositorio reales.
export const GITHUB_POSTS_EDIT_URL = "https://github.com/uranotools/my-ainewsletter-template/edit/main/public/data/posts.json";

// URL para el archivo JSON con los datos de las noticias. 
// Usar import.meta.env.BASE_URL asegura que funcione en GitHub Pages.
export const POSTS_JSON_URL = `${import.meta.env.BASE_URL}data/posts.json`;
