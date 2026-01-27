import { readFile } from 'fs/promises'
import { join } from 'path'
import type { Testimonial } from '../../shared/types/Testimonial'

export default defineEventHandler(async (event): Promise<Testimonial[]> => {
  try {
    const filePath = join(process.cwd(), 'data', 'testimonials.json')
    const fileContent = await readFile(filePath, 'utf-8')
    const testimonials: Testimonial[] = JSON.parse(fileContent)
    return testimonials.sort((a, b) => {
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
      return dateB - dateA
    })
  } catch (error) {
    console.error('Erro ao ler testimonials:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao carregar testimonials',
    })
  }
})
