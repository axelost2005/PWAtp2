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
