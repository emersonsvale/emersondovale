import { readFile } from 'fs/promises'
import { join } from 'path'
import type { Project } from '../../../../shared/types/Project'

export default defineEventHandler(async (event): Promise<Project> => {
  try {
    const slug = getRouterParam(event, 'slug')
    if (!slug) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Slug é obrigatório',
      })
    }

    const filePath = join(process.cwd(), 'data', 'projects.json')
    const fileContent = await readFile(filePath, 'utf-8')
    const projects: Project[] = JSON.parse(fileContent)
    
    // Debug: log dos slugs disponíveis e o slug buscado
    if (process.env.NODE_ENV === 'development') {
      console.log('Slug recebido:', slug)
      console.log('Slugs disponíveis:', projects.map(p => p.slug))
    }
    
    const project = projects.find((p) => p.slug === slug)

    if (!project) {
      if (process.env.NODE_ENV === 'development') {
        console.log('Projeto não encontrado para slug:', slug)
      }
      throw createError({
        statusCode: 404,
        statusMessage: 'Projeto não encontrado',
      })
    }

    return project
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    console.error('Erro ao buscar projeto:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao carregar projeto',
    })
  }
})
