# ⚽ EquipoFutbol

Aplicación web desarrollada con **React** que permite explorar equipos de fútbol, visualizar información detallada y guardar favoritos. También ofrece navegación entre páginas, búsqueda dinámica, soporte multi-idioma (Español/Inglés), **autenticación de usuarios con JWT** (registro, login y logout) y **favoritos persistidos por usuario en la base de datos** a través de la API.

---

## 👥 Equipo de Desarrollo
*  **Tomas Sanchez (FAI-4494)** – *Developer*
*  **Axel Ostrovsky (FAI-4744)** – *Project Manager*
*  **Jorge Gonzalez (FAI-4460)** – *Developer*

---

## 🚀 Instalación
1. Clonar el repositorio:
```bash git clone <URL_DEL_REPO>```
2. Instalar dependencias:
```bash npm install```
3. Crear un archivo `.env` en `EquipoFutbol/` (tomando `.env.example` como base) con la URL del backend:
```env
VITE_API_URL=http://localhost:3000
```
4. Ejecutar la aplicación:
```bash npm run dev```

> La variable `VITE_API_URL` define a qué backend apunta el frontend. En producción se usa la URL del backend deployado.

---

## Funcionalidades Detalladas

La aplicación se estructura en 4 páginas principales, todas compartiendo un **Header** y **Footer** constante para una navegación fluida.

### Header
* **Header.jsx:** Barra superior con el logo de la app y controles que dependen de la sesión:
    * **Home/Inicio:** Acceso directo a la pantalla principal.
    * **Favorites/Favoritos:** Acceso a la lista de favoritos del usuario (solo visible con sesión iniciada).
    * **Sin sesión:** se muestran los enlaces **Iniciar sesión** y **Registrarse**.
    * **Con sesión:** se muestra el nombre del usuario y el botón **Cerrar sesión**.
    * **Selector En/Es:** Control de idioma mediante el componente `LanguageSelector.jsx`.
<img width="955" height="110" alt="image" src="https://github.com/user-attachments/assets/069a28ff-2802-48ff-9105-c0fb479f4e6e" />

## Footer
* **Footer.jsx:** sección ubicada al final de todas las páginas que incluye:
    * Una breve descripción de la aplicación  
    * Información de contacto: teléfono, email y ubicación  
    * Enlaces a redes sociales

<img width="1792" height="330" alt="image" src="https://github.com/user-attachments/assets/47c2b7fe-5be3-47a3-b92f-7ad3accf1e60" />

### Home (Página Principal)
Es la puerta de entrada y presentación de la app.
* **Búsqueda Inteligente:** Incluye un input que filtra equipos por nombre realizando llamados a la API, ideal para encontrar un club específico rápidamente.
* **Cards de Equipos:** Cada equipo se presenta en una tarjeta con su información básica y dos acciones:
    * **Botón de Favoritos (♡):** Si se presiona, el corazón cambia a color **rojo** y el equipo se guarda.
    * **Botón de Detalles:** Redirige al usuario a la información extendida del equipo.

### Details (Detalles del Equipo)
Proporciona una la información del club seleccionado:
* Muestra: Nombre, división, descripción, país, liga, estadio, año de fundación, entrenador y títulos obtenidos.
* Incluye un **botón de retorno** que redirige automáticamente al inicio.

### Register y Login (Autenticación)
* **Register.jsx** (`/registro`): formulario de **nombre, email y contraseña**. Valida en el cliente y muestra los errores de validación que devuelve el backend (400) y los conflictos (409: email o nombre ya usado). Al registrarse correctamente, redirige al login.
* **Login.jsx** (`/login`): formulario de **email y contraseña**. Al iniciar sesión, guarda el **token JWT** y los datos del usuario en el estado global.

### Favorites (Gestión de Favoritos)
Esta página muestra los favoritos del usuario autenticado, **obtenidos siempre desde la API** (`GET /api/favorites`) y persistidos en la base de datos (ya **no** se usa LocalStorage).
* Muestra los equipos que el usuario marcó, con su información completa.
* **Sincronización en tiempo real:** agregar o quitar un favorito (desde las cards, el hero o esta página) pega a la API y actualiza el estado global, por lo que la interfaz se actualiza al instante.
* Es una **ruta privada**: sin sesión iniciada redirige al login. Los botones de favorito solo aparecen con sesión activa.

### ⚠️ NotFound (Error 404)
Si el usuario intenta acceder a una ruta inexistente (ej: `/desarrollo`), la app captura el error y muestra esta página especializada.
*   Informa sobre el error 404 de página inexistente.
*   Ofrece un botón de acción rápida para regresar a la página de inicio de forma segura.

<img width="800" height="414" alt="image" src="https://github.com/user-attachments/assets/cb41444b-98b1-4e58-9a1d-87225d5a0adf" />

---

## 🔐 Autenticación y manejo de sesión

La autenticación se maneja con **JWT** y la **Context API** de React.

* **AuthContext (`src/context/AuthContext.jsx`):** estado global de la sesión. Expone `user`, `token`, `isAuthenticated`, `login()` y `logout()` desde cualquier componente.
    * El **token JWT** se guarda en `localStorage`. El usuario **no** se persiste: al recargar, se rehidrata pidiendo `GET /api/auth/me` con el token (si venció, se cierra la sesión sola).
    * **Login:** `POST /api/auth/login` devuelve `{ token, user }`; se guardan en el contexto.
    * **Logout:** llama a `POST /api/auth/logout`, borra el token de `localStorage`, limpia el estado y redirige al inicio.
* **ProtectedRoute (`src/components/ProtectedRoute.jsx`):** envuelve las rutas privadas (ej. `/favoritos`) y redirige a `/login` si no hay sesión.
* **Requests protegidas:** todas envían el header `Authorization: Bearer <token>` (perfil del usuario y favoritos).
* **FavoritesContext (`src/context/FavoritesContext.jsx`):** mantiene los favoritos del usuario, cargados desde la API. Los favoritos se persisten en la base de datos a través de la API, no en `localStorage`.

---

## Estructura del proyecto
- `public/logos`: recursos visuales  
- `src/components`: componentes reutilizables (incluye `ProtectedRoute`)  
- `src/pages`: páginas principales (Home, Details, Favorites, Login, Register, NotFound)  
- `src/context`: estado global (`AuthContext`, `FavoritesContext`)  
- `src/services`: lógica de llamadas a la API (`authService`, `teamsService`, `favoritesService`)  
- `src/locales`: archivos de traducción  
- `src/utils`: utilidades de la aplicación  

---

## ⚙️ Tecnologías utilizadas
- React  
- Tailwind CSS  
- react-router-dom  
- react-i18next  
- Context API (estado global de auth y favoritos)  
- JWT (autenticación)  
- API REST propia (backend Express + PostgreSQL)  
