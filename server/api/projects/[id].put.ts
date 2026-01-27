import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import type { Project, ProjectUpdate } from '../../../../shared/types/Project'
import { requireAuth } from '../../utils/auth'

export default defineEventHandler(async (event): Promise<Project> => {
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

    const body = await readBody<ProjectUpdate>(event)
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

    // Verifica se o slug está sendo alterado e se já existe
    if (body.slug && body.slug !== projects[projectIndex].slug) {
      if (projects.some((p) => p.slug === body.slug && p.id !== id)) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Já existe um projeto com este slug',
        })
      }
    }

    // Atualiza o projeto
    const updatedProject: Project = {
      ...projects[projectIndex],
      ...body,
      updated_at: new Date().toISOString(),
    }

    projects[projectIndex] = updatedProject

    // Salva no arquivo
    await writeFile(filePath, JSON.stringify(projects, null, 2), 'utf-8')

    return updatedProject
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    console.error('Erro ao atualizar projeto:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao atualizar projeto',
    })
  }
})
