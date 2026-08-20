# Grúas Fernández — Landing Page

Landing page responsive para **Grúas Fernández**, diseñada a partir del logo proporcionado.

## Estructura

```text
gruas-fernandez-landing/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    └── logo.png
```

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub, por ejemplo `gruas-fernandez`.
2. Sube todos los archivos manteniendo la estructura de carpetas.
3. En GitHub entra a **Settings → Pages**.
4. En **Build and deployment**, selecciona:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. Guarda y espera a que GitHub genere la URL de Pages.

## Antes de publicar

Abre `script.js` y cambia:

```js
const COMPANY_EMAIL = "cotizaciones@tudominio.com";
```

por el correo real de Grúas Fernández.

El formulario no necesita backend: al enviarlo abre la aplicación de correo del visitante con el mensaje ya preparado.

## Personalización

- **Colores:** las variables principales están al inicio de `styles.css`.
- **Logo:** reemplaza `assets/logo.png` por la versión definitiva si tienes una con mayor resolución.
- **Textos:** edita directamente `index.html`.
- **WhatsApp:** si posteriormente quieres un botón de WhatsApp, añade el número real de la empresa; no se ha inventado uno en esta plantilla.

## Nota

La página está construida sin frameworks ni dependencias de Node, por lo que puede alojarse directamente como un sitio estático en GitHub Pages.
