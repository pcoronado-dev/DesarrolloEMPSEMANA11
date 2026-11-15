# Laboratorio 11 – Comunicación entre Componentes en ReactJS

**Curso:** Desarrollo de Aplicaciones Empresariales · **Sección:** A · **Semana:** 11
**Alumno:** _(escribe aquí tu nombre)_

## 1. Árbol de componentes y dónde vive cada dato

```
App                      ← searchText, favoriteIds (estado compartido), debouncedText
├── Header               ← recibe solo favoritesCount (número)
├── main
│   ├── Banner           ← recibe activeFilter, resultsCount, onClearFilter
│   ├── SearchBar        ← recibe value, onChange, isPending (componente controlado)
│   ├── PremiereSection  ← estado local: simulateError; hook usePremieres (status/data/error)
│   │   ├── LoadingSkeleton   (estado: cargando)
│   │   ├── mensaje de error  (estado: error, con botón Reintentar)
│   │   └── PremiereCarousel  ← estado local: start (índice); hook useWindowSize
│   │       └── MovieCard
│   └── MovieList        ← hook useWindowSize
│       └── MovieCard    ← llama a notify.* (utils/notify.js)
└── Toaster              (react-hot-toast)
```

| Dato | Vive en | Motivo |
|---|---|---|
| `searchText` | App | Lo leen SearchBar, Banner y MovieList, y Banner además lo limpia. |
| `favoriteIds` | App | Lo escriben las tarjetas (en dos listas) y lo lee la cabecera. |
| `simulateError` | PremiereSection | Solo esa sección lo usa. |
| `start` (carrusel) | PremiereCarousel | Es detalle interno del carrusel. |

## 2. ¿Por qué el contador de favoritas no puede vivir en la cabecera?

En React los datos fluyen hacia abajo (props) y los eventos hacia arriba (callbacks). Las tarjetas que
marcan favoritas (`MovieCard`, dentro de `MovieList` y `PremiereCarousel`) y la cabecera (`Header`) son
ramas **hermanas**: ninguna es hija de la otra. Si el contador viviera en `Header`, las tarjetas no
tendrían forma de modificarlo, porque un componente no puede escribir en el estado de un hermano. La
solución es **elevar el estado** al ancestro común más cercano que lo necesita, que es `App`. Allí vive
`favoriteIds`; las tarjetas reciben `onToggleFavorite` para cambiarlo y `Header` recibe solo
`favoritesCount={favoriteIds.length}`, sin la lista completa. No se sube más arriba de `App` porque no
existe un nivel superior que lo necesite.

## 3. Hooks propios: qué lógica se extrajo y quién la comparte

| Hook | Lógica extraída | Componentes que lo usan |
|---|---|---|
| `useDebounce` | Retardo antes de aplicar el filtro (reemplaza el `setTimeout` manual del lab 10). | `App` (filtro de la cartelera) |
| `useWindowSize` | Escucha de `resize` con limpieza del listener. | `MovieList`, `PremiereCarousel`, `LoadingSkeleton` |
| `usePremieres` | Petición simulada con estados `loading / success / error` y `retry`. | `PremiereSection` |

Los tres cumplen las reglas de los hooks: nombre con prefijo `use`, llamados en el nivel superior del
componente y con limpieza en `useEffect` (clearTimeout / removeEventListener / bandera `cancelled`).

## 4. Biblioteca de interfaz y estados de carga/error

- **react-hot-toast**: aviso emergente al marcar/desmarcar favoritas. La tarjeta llama a `notify.success`
  / `notify.info` (`utils/notify.js`) y no sabe cómo se dibuja el aviso.
- **react-loading-skeleton**: esqueleto mientras cargan los estrenos.
- **Error:** mensaje explicativo (“El servidor de estrenos no respondió (503)”) con botón **Reintentar**.
  Se puede provocar con la casilla “Simular error del servidor”.

## 5. Patrón adaptador

`utils/movieAdapter.js` convierte el dato crudo (`movie_title`, `rating_10`, `genre: "A|B"`,
`duration_min`) al modelo de la aplicación (`title`, `rating`, `genres[]`, `durationLabel`). Los
componentes solo conocen el modelo adaptado.

## 6. Casos de prueba

| # | Acción | Resultado esperado |
|---|---|---|
| 1 | Cargar la página | Skeleton ~2 s y luego el carrusel de estrenos. |
| 2 | Marcar ☆ en una película | Estrella llena, aviso “añadida”, cabecera muestra +1. |
| 3 | Desmarcar ★ | Aviso “salió de tus favoritas”, cabecera −1. |
| 4 | Marcar la misma película en estrenos y cartelera | El contador cuenta cada película una sola vez por id. |
| 5 | Escribir “drama” | Tras ~350 ms se filtra; aparece “Buscando…” mientras tanto. |
| 6 | Pulsar “Limpiar filtro” en el banner | Se vacía el buscador y vuelve el listado completo. |
| 7 | Buscar “zzz” | Mensaje “No hay películas que coincidan…”. |
| 8 | Marcar “Simular error del servidor” | Skeleton y luego mensaje de error con Reintentar. |
| 9 | Reducir/ampliar la ventana | 1–4 columnas en la lista y 1–3 tarjetas en el carrusel. |

## 7. Capturas (pegar aquí)
- Resultado en navegador (estado normal, cargando, error, aviso emergente)
- Estructura del proyecto en VS Code

## Conclusiones
_(escribe aquí tus conclusiones)_
