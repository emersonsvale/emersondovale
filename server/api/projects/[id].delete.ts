import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import type { Project } from '../../../../shared/types/Project'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event): Promise<{ success: boolean }> => {
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

    const filePath = join(process.cwd(), 'data', 'projects.json')
    const fileContent = await readFile(filePath, 'utf-8')
    const projects: Project[] = JSON.parse(fileContent)

    const projectIndex = projects.findIndex((p) => p.id === id)
    if (projectIndex === -1) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Projeto não encontrado',
      })
    }

    // Remove o projeto
    projects.splice(projectIndex, 1)

    // Salva no arquivo
    await writeFile(filePath, JSON.stringify(projects, null, 2), 'utf-8')

    return { success: true }
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    console.error('Erro ao deletar projeto:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao deletar projeto',
    })
  }
})
