# PizzaHouse (https://demo.templatemonster.com/es/demo/49531.html)

Sitio web de una pizzería creado con Angular. Incluye una página de inicio con secciones promocionales y de reserva, cartas por categorías, páginas informativas, blog, tienda de muestra y páginas de componentes.

> **Estado del proyecto:** es una aplicación de interfaz (frontend). El repositorio no configura una API ni un backend para procesar pedidos, pagos o reservas.

## Requisitos

- Node.js compatible con la versión de Angular del proyecto.
- npm (el proyecto declara `npm@11.19.0` como gestor).

## Empezar

Desde la carpeta del proyecto, instala las dependencias y arranca el servidor de desarrollo:

```bash
npm ci
npm start
```

Abre [http://localhost:4200](http://localhost:4200). Angular recarga la aplicación al detectar cambios en los archivos fuente.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia el servidor de desarrollo (`ng serve`). |
| `npm run build` | Genera la compilación de producción en `dist/`. |
| `npm test` | Ejecuta las pruebas unitarias con el ejecutor configurado por Angular y Vitest. |
| `npm run watch` | Compila en modo desarrollo y observa los cambios. |

No hay un comando ni un framework de pruebas end-to-end configurado en `package.json`.

## Secciones de la aplicación

- **Inicio:** carrusel principal, categorías del menú, selección de pizzas, galería, opiniones y reserva de mesas.
- **Menú:** carta general y categorías de pizzas, hamburguesas, ensaladas, bebidas, mariscos y postres.
- **Tienda:** listado, detalle de producto, carrito y checkout de muestra.
- **Contenido:** información del restaurante, servicios, blog y galería.
- **Páginas adicionales:** contactos, preguntas frecuentes, política de privacidad, resultados de búsqueda y páginas de ejemplo para elementos de interfaz.

La ruta raíz (`/`) redirige a `/home`; las rutas desconocidas muestran la página `/pages/404`.

## Rutas principales

| Ruta | Contenido |
| --- | --- |
| `/home` | Página de inicio |
| `/about` | Sobre el restaurante |
| `/menu` | Menú completo |
| `/menu/pizzas`, `/menu/burgers`, `/menu/salads`, `/menu/drinks`, `/menu/seafood`, `/menu/desserts` | Categorías del menú |
| `/shop` | Tienda |
| `/shop/single-product` | Detalle de producto |
| `/shop/cart-page` | Carrito |
| `/shop/checkout` | Checkout |
| `/news/grid-blog` | Blog en cuadrícula |
| `/news/masonry-blog` | Blog tipo masonry |
| `/news/blog-post` | Artículo de blog |
| `/services` | Servicios |
| `/pages/contacts` | Contacto |
| `/pages/faq` | Preguntas frecuentes |
| `/gallery/grid` | Galería |

También existen rutas de demostración bajo `/pages`, `/elements` y `/services`. La lista completa está definida en `src/app/app.routes.ts`.

## Estructura del proyecto

```text
src/
├── app/
│   ├── features/    # Páginas y secciones agrupadas por funcionalidad
│   ├── layout/      # Cabecera y pie de página
│   ├── app.routes.ts
│   └── app.ts
├── index.html
├── main.ts
└── styles.css
public/              # Imágenes, iconos y otros recursos estáticos
```

Las páginas se cargan mediante rutas de Angular y componentes standalone. Los recursos de `public/` se sirven desde la raíz de la aplicación.

## Tecnologías

- Angular 22
- TypeScript
- RxJS
- Bootstrap Icons
- Vitest para pruebas unitarias

## Desarrollo

Para crear un componente con Angular CLI:

```bash
npx ng generate component features/nombre-del-componente
```

Al añadir una página, registra su ruta en `src/app/app.routes.ts` y conserva la organización por funcionalidad. Para compilar y comprobar los cambios:

```bash
npm test
npm run build
```
