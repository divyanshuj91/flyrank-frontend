import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const OCR_ENGINES = ['Tesseract', 'AWS Textract'] as const

export const settingsSchema = z.object({
  apiKey: z
    .string()
    .min(1, 'API Key is required')
    .length(32, 'API Key must be exactly 32 characters'),
  ocrEngine: z.enum(OCR_ENGINES, {
    error: 'Please select an OCR engine',
  }),
})

export type SettingsFormValues = z.infer<typeof settingsSchema>

interface SettingsFormProps {
  onSubmit: (data: SettingsFormValues) => void
}

export function SettingsForm({ onSubmit }: SettingsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      apiKey: '',
      ocrEngine: 'Tesseract',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label htmlFor="apiKey">API Key</label>
        <input
          id="apiKey"
          type="password"
          aria-invalid={errors.apiKey ? true : false}
          aria-describedby={errors.apiKey ? 'apiKey-error' : undefined}
          {...register('apiKey')}
        />
        {errors.apiKey && (
          <span id="apiKey-error" role="alert">
            {errors.apiKey.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="ocrEngine">OCR Engine</label>
        <select
          id="ocrEngine"
          aria-invalid={errors.ocrEngine ? true : false}
          aria-describedby={errors.ocrEngine ? 'ocrEngine-error' : undefined}
          {...register('ocrEngine')}
        >
          {OCR_ENGINES.map((engine) => (
            <option key={engine} value={engine}>
              {engine}
            </option>
          ))}
        </select>
        {errors.ocrEngine && (
          <span id="ocrEngine-error" role="alert">
            {errors.ocrEngine.message}
          </span>
        )}
      </div>

      <button type="submit">Save Settings</button>
    </form>
  )
}
