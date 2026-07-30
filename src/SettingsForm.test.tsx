import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SettingsForm } from './SettingsForm'

describe('SettingsForm', () => {
  it('shows validation error and blocks submission when API key is under 32 characters', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(<SettingsForm onSubmit={handleSubmit} />)

    const apiKeyInput = screen.getByLabelText(/api key/i)
    await user.type(apiKeyInput, 'short-key')

    await user.click(screen.getByRole('button', { name: /save settings/i }))

    await waitFor(() => {
      expect(
        screen.getByText(/api key must be exactly 32 characters/i),
      ).toBeInTheDocument()
    })

    expect(handleSubmit).not.toHaveBeenCalled()
    expect(apiKeyInput).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows validation error and blocks submission when API key is empty', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    render(<SettingsForm onSubmit={handleSubmit} />)

    await user.click(screen.getByRole('button', { name: /save settings/i }))

    await waitFor(() => {
      expect(screen.getByText(/api key is required/i)).toBeInTheDocument()
    })

    expect(handleSubmit).not.toHaveBeenCalled()
    expect(screen.getByLabelText(/api key/i)).toHaveAttribute(
      'aria-invalid',
      'true',
    )
  })

  it('submits successfully when API key is exactly 32 characters', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()
    const validApiKey = 'a'.repeat(32)

    render(<SettingsForm onSubmit={handleSubmit} />)

    await user.type(screen.getByLabelText(/api key/i), validApiKey)
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith(
        { apiKey: validApiKey, ocrEngine: 'Tesseract' },
        expect.anything(),
      )
    })
  })
})
