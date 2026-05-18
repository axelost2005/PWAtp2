    # Testing Automático — EquipoFutbol

    **Materia:** Programación Web Avanzada  
    **Integrante:** Tomás Sanchez  
    **Componentes testeados:** `Layout` y `LanguageSelector`

    ---

    ## 1. Librerías instaladas

    | Librería | Versión | Rol |
    |---|---|---|
    | `vitest` | ^4.1.6 | Test runner compatible con Vite |
    | `@testing-library/react` | ^16.3.2 | Renderizado de componentes React en tests |
    | `@testing-library/jest-dom` | ^6.9.1 | Matchers adicionales para el DOM (`toBeInTheDocument`, etc.) |
    | `@testing-library/user-event` | ^14.6.1 | Simulación de acciones reales del usuario |
    | `jsdom` | ^29.1.1 | Entorno de navegador simulado para los tests |

    Instalación:

    ```bash
    npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
    ```

    ---

    ## 2. Archivos de configuración creados o modificados

    ### `vite.config.js`

    Se agregó el bloque `test` para configurar Vitest con jsdom como entorno y el archivo de setup:

    ```js
    test: {
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.js'],
        globals: true,
    }
    ```

    ### `src/setupTests.js` _(archivo nuevo)_

    Importa los matchers de jest-dom para que estén disponibles en todos los tests:

    ```js
    import '@testing-library/jest-dom'
    ```

    ### `package.json`

    Se agregaron los scripts de testing:

    ```json
    "test": "vitest",
    "test:run": "vitest run"
    ```

    ---

    ## 3. Cómo ejecutar los tests

    ```bash
    # Dentro de la carpeta EquipoFutbol:

    npm run test:run    # Ejecuta los tests una sola vez (para entrega)
    npm run test        # Modo watch: re-ejecuta al guardar cambios
    ```

    Resultado esperado:

    ```
    Test Files  2 passed (2)
        Tests  8 passed (8)
    ```

    ---

    ## 4. Tests creados

    ### `Layout.test.jsx`

    **Archivo:** `src/components/Layout/Layout.test.jsx`

    El componente `Layout` es el envoltorio general de la aplicación. Renderiza el `Header`, el contenido de la página actual (via `Outlet` de React Router) y el `Footer`.

    **Estrategia:** Se mockearon `Header` y `Footer` para aislar el test de sus dependencias externas (i18next, React Router). Se usó `MemoryRouter` con rutas anidadas para simular el comportamiento del `Outlet`.

    **Tests:**

    ```js
    describe('Layout', () => {
        it('renderiza el header en la parte superior')
        it('renderiza el footer en la parte inferior')
        it('renderiza el contenido de la página actual a través del Outlet')
        it('contiene un elemento main que envuelve el contenido')
    })
    ```

    **Código completo:**

    ```jsx
    import { render, screen } from '@testing-library/react'
    import { MemoryRouter, Routes, Route } from 'react-router-dom'
    import { describe, it, expect, vi } from 'vitest'
    import Layout from './Layout'

    vi.mock('../Header/Header', () => ({
        default: () => <header data-testid="header">Header</header>,
    }))

    vi.mock('../Footer/Footer', () => ({
        default: () => <footer data-testid="footer">Footer</footer>,
    }))

    function renderLayout(children = null) {
        return render(
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={children ?? <div>Contenido de página</div>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        )
    }

    describe('Layout', () => {
        it('renderiza el header en la parte superior', () => {
            renderLayout()
            expect(screen.getByTestId('header')).toBeInTheDocument()
        })

        it('renderiza el footer en la parte inferior', () => {
            renderLayout()
            expect(screen.getByTestId('footer')).toBeInTheDocument()
        })

        it('renderiza el contenido de la página actual a través del Outlet', () => {
            renderLayout(<p>Página de inicio</p>)
            expect(screen.getByText('Página de inicio')).toBeInTheDocument()
        })

        it('contiene un elemento main que envuelve el contenido', () => {
            renderLayout()
            expect(screen.getByRole('main')).toBeInTheDocument()
        })
    })
    ```

    ---

    ### `LanguageSelector.test.jsx`

    **Archivo:** `src/components/LanguageSelector/LanguageSelector.test.jsx`

    El componente `LanguageSelector` muestra un `<select>` con las opciones ES y EN. Al cambiar la opción, llama a `i18n.changeLanguage()` y guarda el idioma seleccionado en `localStorage`.

    **Estrategia:** Se mockeó `react-i18next` para controlar el idioma inicial (`es`) y capturar las llamadas a `changeLanguage`. Se usó `userEvent` para simular la selección real del usuario. Se limpió `localStorage` en cada test con `beforeEach`.

    **Tests:**

    ```js
    describe('LanguageSelector', () => {
        it('muestra el selector de idioma con la opción ES seleccionada por defecto')
        it('muestra las opciones ES y EN disponibles')
        it('llama a changeLanguage con "en" cuando el usuario selecciona inglés')
        it('guarda el idioma seleccionado en localStorage')
    })
    ```

    **Código completo:**

    ```jsx
    import { render, screen } from '@testing-library/react'
    import userEvent from '@testing-library/user-event'
    import { describe, it, expect, vi, beforeEach } from 'vitest'
    import LanguageSelector from './LanguageSelector'

    const mockChangeLanguage = vi.fn().mockResolvedValue(undefined)

    vi.mock('react-i18next', () => ({
        useTranslation: () => ({
            i18n: {
                resolvedLanguage: 'es',
                language: 'es',
                changeLanguage: mockChangeLanguage,
            },
        }),
    }))

    describe('LanguageSelector', () => {
        beforeEach(() => {
            mockChangeLanguage.mockClear()
            localStorage.clear()
        })

        it('muestra el selector de idioma con la opción ES seleccionada por defecto', () => {
            render(<LanguageSelector />)
            expect(screen.getByRole('combobox')).toHaveValue('es')
        })

        it('muestra las opciones ES y EN disponibles', () => {
            render(<LanguageSelector />)
            const options = screen.getAllByRole('option')
            expect(options).toHaveLength(2)
            expect(options[0]).toHaveValue('es')
            expect(options[1]).toHaveValue('en')
        })

        it('llama a changeLanguage con "en" cuando el usuario selecciona inglés', async () => {
            const user = userEvent.setup()
            render(<LanguageSelector />)
            await user.selectOptions(screen.getByRole('combobox'), 'en')
            expect(mockChangeLanguage).toHaveBeenCalledWith('en')
        })

        it('guarda el idioma seleccionado en localStorage', async () => {
            const user = userEvent.setup()
            render(<LanguageSelector />)
            await user.selectOptions(screen.getByRole('combobox'), 'en')
            expect(localStorage.getItem('i18nextLng')).toBe('en')
        })
    })
    ```

    ---

    ## 5. Resultado final

    ```
    Test Files  2 passed (2)
        Tests  8 passed (8)
    ```

    Todos los tests pasan correctamente con `npm run test:run`.
