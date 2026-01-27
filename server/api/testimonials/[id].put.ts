import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import type { Testimonial, TestimonialUpdate } from '../../../../shared/types/Testimonial'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event): Promise<Testimonial> => {
  // Verifica autenticação
  await requireAuth(event)

  try {
    const id = getRouterParam(event, 'id')
    if (!id) {
      throw createError({
        statusCode: 400,
        statusMessage: 'ID é obrigatório',
      })
    }

    const body = await readBody<TestimonialUpdate>(event)
    const filePath = join(process.cwd(), 'data', 'testimonials.json')
    const fileContent = await readFile(filePath, 'utf-8')
    const testimonials: Testimonial[] = JSON.parse(fileContent)

    const testimonialIndex = testimonials.findIndex((t) => t.id === id)
    if (testimonialIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Testimonial não encontrado',
      })
    }

    // Atualiza o testimonial
    const updatedTestimonial: Testimonial = {
      ...testimonials[testimonialIndex],
      ...body,
      updated_at: new Date().toISOString(),
    }

    testimonials[testimonialIndex] = updatedTestimonial

    // Salva no arquivo
    await writeFile(filePath, JSON.stringify(testimonials, null, 2), 'utf-8')

    return updatedTestimonial
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    console.error('Erro ao atualizar testimonial:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao atualizar testimonial',
    })
  }
})
