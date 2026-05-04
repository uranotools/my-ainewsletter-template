# Urano AI News Template

Un template moderno, estático y optimizado para la publicación automática de newsletters y noticias de Inteligencia Artificial utilizando React 18, Vite, TypeScript y TailwindCSS.

Diseñado con una estética "The 8088 / Industrial Elegance" y modo oscuro por defecto.

## Funcionalidades
- **100% Estático:** Todas las noticias se leen de `public/data/posts.json`.
- **Rápido y Responsive:** Desarrollado con TailwindCSS, adaptado para móviles.
- **Filtros Dinámicos:** Búsqueda por texto, categorías y fecha sin recargar la página.
- **Modo Editor:** Un dashboard oculto (`/?role=editor`) protegido por PIN local (por defecto `1234`) para ver la lista completa de posts y enlazar a GitHub.
- **Auto-Despliegue:** Incluye GitHub Actions (`.github/workflows/deploy.yml`) para publicar directamente en GitHub Pages con `peaceiris/actions-gh-pages`.

## Requisitos
- Node.js >= 18
- npm o yarn

## Desarrollo Local

1. Clona el repositorio e instala las dependencias:
```bash
git clone <tu-repositorio>
cd urano-ai-news-template
npm install
```

2. Inicia el servidor de desarrollo:
```bash
npm run dev
```

3. Visita `http://localhost:5173` en tu navegador.

## Cómo Publicar Nuevos Posts

El archivo principal que controla el contenido del sitio es `public/data/posts.json`. Cada post debe seguir este formato exacto:

```json
{
  "id": "2026-05-04-mi-noticia",
  "title": "Título de la Noticia",
  "date": "2026-05-04T10:00:00Z",
  "categories": ["llm", "hardware"],
  "score": 95,
  "image": "https://url-de-la-imagen.jpg",
  "excerpt": "Resumen breve para la tarjeta.",
  "content": "Markdown completo del artículo...",
  "source": "Nombre del Medio",
  "originalUrl": "https://..."
}
```

Al subir cambios a la rama `main`, la GitHub Action automáticamente compilará el proyecto y lo subirá a la rama `gh-pages`.

## Personalización

- **Colores y Tipografía:** Modifica los valores CSS variables en `src/index.css`.
- **Base de Vite:** Si tu repositorio no se despliega en la raíz de tu dominio (ej. `tu-usuario.github.io/tu-repo/`), el archivo `vite.config.ts` usa `base: './'` de forma predeterminada, lo que funciona bien para rutas relativas usando `HashRouter`.

## Editor Mode & Seguridad

El template incluye un modo de administración protegido para visualizar rápidamente los artículos y acceder a los enlaces de edición en GitHub.

### Configuración del PIN de Acceso

Por seguridad, el PIN no se guarda en texto plano. Se genera un hash SHA-256 durante el proceso de build.

1. **Definir el PIN**: Crea o edita el archivo `.env` en la raíz del proyecto:
   ```env
   VITE_EDITOR_PIN=tu_pin_secreto
   ```
2. **Generar el Hash**: Ejecuta el script de cifrado (esto ocurre automáticamente al correr `npm run dev` o `npm run build`):
   ```bash
   node scripts/generate-pin.js
   ```
   Este comando creará un archivo `public/config.json` con el hash resultante. **No borres este archivo**, ya que es necesario para la validación en producción.

### Acceso al Dashboard

Para acceder al modo editor, navega a la URL con el parámetro `role`:
`https://tu-sitio.com/?role=editor`

Ingresa el PIN que definiste en tu archivo `.env` para desbloquear las funciones de administración.

## Despliegue en GitHub Pages

1. Ve a los **Settings** de tu repositorio en GitHub.
2. Navega a **Pages** (en el menú izquierdo).
3. Asegúrate de que `Source` esté en `Deploy from a branch`.
4. En **Branch**, selecciona `gh-pages` y guarda.
5. El sitio estará disponible después de la ejecución exitosa de la Action.
