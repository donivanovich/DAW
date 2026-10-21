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

---

# Call to Action 2: APIs de Marvel y Amadeus

## 1. Marvel Comics API

Documentación: https://developer.marvel.com/

### Personaje con ID `1009718`

El personaje es **Wolverine (Logan)**. Su fotografía se obtiene del campo `thumbnail` del resultado de la API. La URL de la imagen se forma con `thumbnail.path` + `.` + `thumbnail.extension` (si la API devuelve una imagen no disponible, hay que mostrar una alternativa).

Petición:

```http
GET https://gateway.marvel.com/v1/public/characters/1009718?ts={ts}&apikey={PUBLIC_KEY}&hash={hash}
```

Para obtener al menos tres cómics en los que aparece Wolverine:

```http
GET https://gateway.marvel.com/v1/public/characters/1009718/comics?limit=3&ts={ts}&apikey={PUBLIC_KEY}&hash={hash}
```

En cada resultado hay que indicar `title`, `id` y la portada. La URL de portada se construye con `thumbnail.path` + `.` + `thumbnail.extension`. Los títulos e identificadores deben copiarse de la respuesta real de la API, ya que los resultados pueden variar según los parámetros de paginación y el catálogo disponible.

| Dato solicitado | Cómo obtenerlo |
|---|---|
| Nombre del personaje | `data.results[0].name` de `/characters/1009718` (Wolverine) |
| Foto del personaje | `data.results[0].thumbnail.path` + `.` + `thumbnail.extension` |
| Tres cómics | `data.results` de `/characters/1009718/comics?limit=3` |
| Título de cada cómic | `title` |
| Identificador de cada cómic | `id` |
| Portada de cada cómic | `thumbnail.path` + `.` + `thumbnail.extension` |

### Creador cuyo apellido es “Hoskin”

El creador identificado es **Michael Hoskin**. Trabajó como guionista en publicaciones de referencia y perfiles de personajes de Marvel. Por ejemplo, aparece acreditado en *Annihilation: The Nova Corps (2006) #1* y en publicaciones de la serie *Official Handbook of the Marvel Universe*.

Para recuperar el identificador y los recursos relacionados directamente desde Marvel, busca por apellido:

```http
GET https://gateway.marvel.com/v1/public/creators?lastName=Hoskin&ts={ts}&apikey={PUBLIC_KEY}&hash={hash}
```

En la respuesta, identifica el registro cuyo `fullName` sea `Michael Hoskin`; su `id` es el identificador solicitado y `thumbnail` proporciona la imagen del creador si está disponible. Si no hay foto, puede utilizarse la portada de un cómic en el que aparezca acreditado.

Para consultar sus series:

```http
GET https://gateway.marvel.com/v1/public/creators/{CREATOR_ID}/series?ts={ts}&apikey={PUBLIC_KEY}&hash={hash}
```

Para consultar sus historias:

```http
GET https://gateway.marvel.com/v1/public/creators/{CREATOR_ID}/stories?ts={ts}&apikey={PUBLIC_KEY}&hash={hash}
```

Como ejemplos de publicaciones en las que figura Michael Hoskin están *Annihilation: The Nova Corps* y *Official Handbook of the Marvel Universe*. Para entregar el resultado con los **IDs concretos** de creador, serie e historia, deben anotarse los campos `id`, `title` y `thumbnail`/`thumbnail.path` que devuelva la cuenta de Marvel utilizada. No se debe inventar un identificador si no aparece en la respuesta.

### Autenticación de Marvel

Marvel utiliza una clave pública (`apikey`), una clave privada y un sello de tiempo (`ts`). Se calcula el hash MD5 de la concatenación `ts + privateKey + publicKey` y se envía como parámetro `hash`. La clave privada nunca debe publicarse en el README, en el repositorio ni en código cliente distribuido al navegador.

## 2. Amadeus: estado del vuelo IB 532

Documentación: https://developers.amadeus.com/

La API Self-Service **On Demand Flight Status** permite consultar los datos de un vuelo mediante estos parámetros:

- `carrierCode=IB`: código IATA de Iberia.
- `flightNumber=532`: número de vuelo.
- `scheduledDepartureDate=2026-10-21`: fecha actual del ejercicio (formato `YYYY-MM-DD`, hora local del aeropuerto de salida).

Primero hay que obtener un token OAuth 2.0. Sustituye los marcadores por las credenciales de la aplicación creada en Amadeus; no guardes las credenciales reales en este README.

```bash
curl -X POST "https://test.api.amadeus.com/v1/security/oauth2/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id={API_KEY}&client_secret={API_SECRET}"
```

Copia el `access_token` de la respuesta y úsalo para consultar el vuelo:

```bash
curl -G "https://test.api.amadeus.com/v2/schedule/flights" \
  -H "Authorization: Bearer {ACCESS_TOKEN}" \
  --data-urlencode "carrierCode=IB" \
  --data-urlencode "flightNumber=532" \
  --data-urlencode "scheduledDepartureDate=2026-10-21"
```

En la respuesta JSON, revisa `data`. Si contiene un vuelo, `flightPoints` incluye los aeropuertos y horarios programados; `segments` y `legs` aportan información de los tramos. Si `data` está vacío, el entorno de pruebas no dispone de ese vuelo para esa fecha. El entorno de pruebas puede contener datos limitados o de ejemplo, así que no debe presentarse como confirmación del estado real del vuelo. Para confirmar el estado operativo actual, debe usarse el entorno y los permisos de producción disponibles y contrastarse la respuesta con la aerolínea o el aeropuerto.

## 3. Comparación entre las dos APIs

### ¿Qué diferencias hay?

- **Marvel** es una API de contenido y catálogo: personajes, cómics, creadores, series, historias e imágenes. Las consultas suelen navegar relaciones entre recursos.
- **Amadeus** es una API de viajes: vuelos, horarios y otros datos operativos/comerciales. En este ejercicio se consulta un vuelo concreto usando compañía, número y fecha.
- Marvel devuelve metadatos editoriales y recursos multimedia; Amadeus devuelve datos estructurados de itinerarios, aeropuertos, horarios y tramos de vuelo.

### ¿La autenticación es igual?

No. Marvel utiliza una clave pública, una clave privada, un `ts` y un hash MD5 calculado para la petición. Amadeus utiliza `API Key` y `API Secret` para solicitar un token OAuth 2.0 con el flujo `client_credentials`; después se envía el token como `Authorization: Bearer ...`. Por tanto, Amadeus requiere un paso adicional para obtener y renovar el token.

### ¿Cuál ha sido más compleja?

Para una consulta sencilla, **Amadeus suele ser más compleja inicialmente**, porque hay que pedir primero el token y luego realizar la consulta autorizada. Marvel también exige preparar correctamente el hash en cada petición, lo que añade trabajo y puede resultar menos habitual al empezar.

### ¿Cuál es más segura en producción?

El diseño de OAuth 2.0 de Amadeus ofrece ventajas operativas: los tokens tienen una duración limitada y se pueden renovar sin enviar el secreto en cada petición de datos. Aun así, la seguridad depende de la implementación. En ambas APIs hay que mantener las credenciales secretas fuera del cliente y del control de versiones, utilizar HTTPS, aplicar permisos mínimos y evitar registrar secretos o tokens. El hash MD5 de Marvel sirve para autenticar la petición según su mecanismo, pero **MD5 no es una función hash moderna para usos criptográficos generales**. No se deben exponer claves privadas en una aplicación web pública.

### ¿Siguen las recomendaciones de diseño de APIs?

En general, ambas presentan varios aspectos positivos:

- Utilizan recursos y rutas que permiten identificar qué se consulta.
- Las consultas de lectura usan `GET` y los filtros se expresan mediante parámetros de consulta.
- Devuelven respuestas estructuradas en JSON y permiten relacionar recursos mediante identificadores o URI.
- La API de Amadeus separa la autenticación de las consultas de datos mediante OAuth 2.0.

También hay aspectos que requieren atención o que dependen del servicio concreto:

- La autenticación de Marvel obliga a construir parámetros de firma en cada llamada; las credenciales deben gestionarse con cuidado.
- Los recursos de Marvel incluyen listas paginadas, por lo que conviene usar `limit` y `offset` y gestionar errores y límites de uso.
- Las respuestas de vuelos son dependientes de la fecha y de la disponibilidad de datos; una respuesta vacía no significa necesariamente que el vuelo no exista.
- Para una integración productiva hay que comprobar códigos HTTP, errores, límites de uso, documentación de versiones, paginación y consistencia de los campos.

**Conclusión:** las dos APIs son útiles y tienen recursos identificables, respuestas JSON y mecanismos de consulta razonables, pero resuelven problemas distintos. Para producción, OAuth 2.0 de Amadeus facilita la gestión de sesiones de acceso; en cualquiera de las dos, la protección de secretos, HTTPS y una gestión correcta de errores son imprescindibles.

## Fuentes

- Marvel: https://developer.marvel.com/documentation/entity_types
- Amadeus, guía de inicio y autenticación: https://admin.developers.amadeus.com/self-service/apis-docs/guides/developer-guides/quick-start/
- Amadeus, On Demand Flight Status: https://github.com/amadeus4dev/data-collection/blob/master/data/ondemandflightstatus.md
- Marvel, *Annihilation: The Nova Corps (2006) #1*: https://www.marvel.com/comics/issue/4822/read
