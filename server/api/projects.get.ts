import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import type { Project } from '../../shared/types/Project'

export default defineEventHandler(async (event): Promise<Project[]> => {
  try {
    const filePath = join(process.cwd(), 'data', 'projects.json')
    const fileContent = await readFile(filePath, 'utf-8')
    const projects: Project[] = JSON.parse(fileContent)
    return projects.sort((a, b) => {
      // Ordena por featured primeiro, depois por data
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
      return dateB - dateA
    })
  } catch (error) {
    console.error('Erro ao ler projetos:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao carregar projetos',
    })
  }
})
