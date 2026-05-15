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
