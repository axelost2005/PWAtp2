# ⚽ EquipoFutbol

Aplicación web desarrollada con **React** que permite explorar equipos de fútbol, visualizar información detallada y guardar favoritos. Tambien nos ofrece navegación entre páginas, búsqueda dinámica, soporte multi-idioma (Español/Inglés) y persistencia de datos mediante LocalStorage.

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
3. Ejecutar la aplicación:
```bash npm run dev```

---

## Funcionalidades Detalladas

La aplicación se estructura en 4 páginas principales, todas compartiendo un **Header** y **Footer** constante para una navegación fluida.

### Header
* **Header.jsx:** Barra superior con el logo de la app y tres controles:
    * **Home/Inicio:** Acceso directo a la pantalla principal.
    * **Favorites/Favoritos:** Acceso a la lista de favoritos del usuario.
    * **Selector En/Es:** Control de idioma mediante el componente `LanguageSelector.jsx`.

## Footer
* **Footer.jsx:** sección ubicada al final de todas las páginas que incluye:
    * Una breve descripción de la aplicación  
    * Información de contacto: teléfono, email y ubicación  
    * Enlaces a redes sociales  

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

### Favorites (Gestión de Favoritos)
Esta página gestiona la persistencia mediante **LocalStorage**.
* Muestra únicamente los equipos que el usuario ha marcado previamente.
* **Sincronización en tiempo real:** Si el usuario desmarca el botón (♡) dentro de esta página, el equipo se elimina de la lista y la interfaz se actualiza instantáneamente sin necesidad de recargar.

### ⚠️ NotFound (Error 404)
Si el usuario intenta acceder a una ruta inexistente (ej: `/desarrollo`), la app captura el error y muestra esta página especializada.
*   Informa sobre el error 404 de página inexistente.
*   Ofrece un botón de acción rápida para regresar a la página de inicio de forma segura.

---

## Estructura del proyecto
- `public/logos`: recursos visuales  
- `src/components`: componentes reutilizables  
- `src/pages`: páginas principales (Home, Details, Favorites, NotFound)  
- `src/services`: lógica de API y LocalStorage  
- `src/locales`: archivos de traducción  
- `src/utils`: utilidades de la aplicación  

---

## ⚙️ Tecnologías utilizadas
- React  
- Tailwind CSS  
- react-router-dom  
- react-i18next  
- MockAPI  
- LocalStorage  
