
# Smart City Dashboard - Frontend

Este proyecto es la interfaz de usuario para la plataforma de monitorización y análisis de datos urbanos de una ciudad inteligente. Se utiliza React para el frontend, con gráficos interactivos proporcionados por Recharts y mapas interactivos con Leaflet.

## Características

- Visualización de datos de **Accidentes**, **Bicicletas**, **Contaminación Acústica** y **Tráfico**.
- Filtros por **fecha** y **distrito** para explorar los datos.
- Gráficas interactivas con **Recharts**.
- Mapa interactivo con **Leaflet** para mostrar los puntos de tráfico.
- Navegación sencilla entre secciones.

## Requisitos

- Node.js >= 14
- npm >= 6.14

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/marcediaza18/extraordinariaFrontend.git
   ```

2. Navega a la carpeta del proyecto:

   ```bash
   cd extraordinariafrontend
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Inicia la aplicación:

   ```bash
   npm start
   ```

La aplicación estará disponible en `http://localhost:3000`.

## Estructura del Proyecto

- **/src**: Archivos de código fuente de la aplicación.
  - **/components**: Componentes reutilizables (por ejemplo, Navbar).
  - **/pages**: Páginas de la aplicación (por ejemplo, Home, Accidente, Trafico).
  - **/styles**: Archivos de estilos globales.
- **/public**: Archivos públicos como el `index.html`.

## Tecnologías Usadas

- **React**: Librería para crear interfaces de usuario.
- **Leaflet**: Librería para la visualización de mapas interactivos.
- **Recharts**: Librería para gráficos interactivos.
- **Framer Motion**: Para animaciones suaves al cargar las páginas.

## Autor

Marcelino Díaz
