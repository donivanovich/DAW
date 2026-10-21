# Diseño de una API REST con ChatGPT

## Prompt inicial

Quiero diseñar una API REST para una biblioteca utilizando C# y Visual
Studio 2022.

El sistema debe permitir gestionar libros, autores y categorías.

Los usuarios deben poder consultar todos los libros, consultar un libro
por su identificador, crear libros, modificar sus datos y eliminarlos.
También deben poder consultar y gestionar autores y consultar las
categorías disponibles.

Un autor puede tener varios libros y una categoría puede contener varios
libros. Cada libro tiene un autor principal y pertenece a una categoría.

Genera un diseño de API REST que incluya:

-   Los recursos principales.
-   Los endpoints y los verbos HTTP adecuados.
-   Los parámetros necesarios.
-   Ejemplos de estructuras JSON para las peticiones y respuestas.
-   Los códigos de estado HTTP más apropiados.
-   Una propuesta de implementación utilizando ASP.NET Core Web API en
    C# con Visual Studio 2022.

Explica el diseño de forma clara, como para un estudiante que está
aprendiendo a crear APIs REST.

## Prompt refinado

Actúa como un desarrollador especializado en ASP.NET Core Web API y C#.

Quiero diseñar e implementar una API REST para gestionar una biblioteca
utilizando Visual Studio 2022.

El sistema tendrá tres recursos:

1.  **Books:** libros con identificador, título, año de publicación,
    identificador del autor e identificador de la categoría.
2.  **Authors:** autores con identificador y nombre.
3.  **Categories:** categorías con identificador y nombre.

### Relaciones

-   Un autor puede tener muchos libros.
-   Una categoría puede contener muchos libros.
-   Cada libro tiene un autor principal y una categoría.

La API debe permitir consultar, crear, modificar y eliminar libros y
autores. Las categorías se podrán consultar. Los libros también deben
poder filtrarse por título, autor y categoría.

Necesito una propuesta completa y coherente que incluya:

1.  Los recursos y sus relaciones.
2.  Una tabla con cada endpoint, verbo HTTP, finalidad y códigos de
    respuesta.
3.  Ejemplos JSON para las peticiones y respuestas.
4.  Validaciones para los campos obligatorios y las relaciones entre
    recursos.
5.  Una implementación de ejemplo en C# para Visual Studio 2022 usando
    ASP.NET Core Web API con controladores.
6.  Los modelos, controladores y configuración necesarios para ejecutar
    y probar la API.
7.  Una explicación paso a paso para crear el proyecto, ejecutarlo y
    probar los endpoints con Swagger.

Distingue entre el diseño conceptual y el código de ejemplo. No inventes
endpoints que no estén justificados por los requisitos y mantén los
nombres de rutas, modelos y propiedades consistentes.

## Objetivo

Diseñar una API REST para una biblioteca, identificar sus recursos y
relaciones, seleccionar los verbos HTTP adecuados y obtener una
implementación de ejemplo en C# con ASP.NET Core Web API.
