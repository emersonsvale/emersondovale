import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import type { Testimonial, TestimonialInsert } from '../../../shared/types/Testimonial'
import { requireAuth } from '../utils/auth'

export default defineEventHandler(async (event): Promise<Testimonial> => {
  // Verifica autenticação
  await requireAuth(event)

  try {
    const body = await readBody<TestimonialInsert>(event)

    // Validação básica
    if (!body.text || !body.name || !body.role || !body.image) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Texto, nome, cargo e imagem são obrigatórios',
      })
    }

    const filePath = join(process.cwd(), 'data', 'testimonials.json')
    const fileContent = await readFile(filePath, 'utf-8')
    const testimonials: Testimonial[] = JSON.parse(fileContent)

    // Cria novo testimonial
    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      ...body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    testimonials.push(newTestimonial)

    // Salva no arquivo
    await writeFile(filePath, JSON.stringify(testimonials, null, 2), 'utf-8')

    return newTestimonial
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    console.error('Erro ao criar testimonial:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao criar testimonial',
    })
  }
})
