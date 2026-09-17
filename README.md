# Taller 4: The Rick and Morty

## Explicación del Proceso

## **Desarrollo y Estructura:** 
Se construyó una aplicación híbrida utilizando **Ionic Framework** en conjunto con **React** y **TypeScript**. Se definió la interfaz estricta `Character` para tipar las propiedades de los personajes:
- `id`
- `name`
- `status`
- `species`
- `image`
- `location`
   
La visualización adapta su diseño mediante un sistema de rejilla responsiva (`IonGrid`, `IonRow`, `IonCol`) con *breakpoints* (`size="12"`, `size-md="6"`, `size-lg="4"`).


## **Sobre la API y el Manejo de Estado:**
Se implementó una función asíncrona `cargarPersonajes` accionada mediante un evento al presionar un botón (`IonButton`). Esta consume el endpoint `https://rickandmortyapi.com/api/character` con la API nativa `fetch()`. La lógica administra tres estados con React Hooks (`useState`):
  - `characters`: Almacena el arreglo de datos procesados (`data.results`).
  - `cargando`: Controla la activación del indicador visual de carga (`IonSpinner`) e inactiva el botón de acción para evitar peticiones duplicadas.
  - `error`: Notifica visualmente al usuario con `IonText` si la llamada a la red falla, usando un bloque `.catch()`.


## **Interfaz:** 
El enrutamiento global está centralizado en `App.tsx` direccionando a la vista `RickAndMortyPage.tsx`. Los datos se renderizan dinámicamente mediante el método `.map()`, construyendo tarjetas informativas (`IonCard`) donde se distingue el estado vital del personaje (`status`) con badges de colores condicionales (`IonBadge` en `success`, `danger` o `medium`), la especie, imagen y ubicación actual.
