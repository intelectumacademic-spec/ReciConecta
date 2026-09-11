# ReciConecta - Landing Page MVP

Landing page estática para publicar en GitHub Pages.

## Archivos

- `index.html`: estructura principal.
- `css/styles.css`: estilos responsivos.
- `js/app.js`: interacción, menú móvil, formularios y sección de validación.
- `assets/`: logotipo y favicon.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub.
2. Sube el contenido de esta carpeta a la raíz del repositorio.
3. En GitHub abre `Settings` > `Pages`.
4. En `Build and deployment`, selecciona `Deploy from a branch`.
5. Elige la rama `main` y la carpeta `/ (root)`.
6. Guarda y espera a que GitHub muestre la URL pública.

## Importante sobre formularios

GitHub Pages es un hosting estático. Por eso, los formularios de esta versión guardan los datos solo en `localStorage` del navegador del visitante. No existe una base de datos central ni se recopilan respuestas de otras personas automáticamente.

Para una validación real, puedes conectar el formulario a un servicio de formularios externo o reemplazarlo por un formulario institucional. Después, sustituye en `js/app.js` los registros ficticios por respuestas reales.

## Datos de demostración

La sección de validación incluye 10 respuestas ficticias claramente marcadas como `Ejemplo ficticio`. Su propósito es mostrar cómo se vería la evidencia dentro del MVP. No deben presentarse como resultados reales.
