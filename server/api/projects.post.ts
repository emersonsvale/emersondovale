import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import type { Project, ProjectInsert } from '../../../shared/types/Project'
import { requireAuth } from '../utils/auth'

export default defineEventHandler(async (event): Promise<Project> => {
  // Verifica autenticação
  await requireAuth(event)

  try {
    const body = await readBody<ProjectInsert>(event)

    // Validação básica
    if (!body.title || !body.description || !body.slug) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Título, descrição e slug são obrigatórios',
      })
    }

    const filePath = join(process.cwd(), 'data', 'projects.json')
    const fileContent = await readFile(filePath, 'utf-8')
    const projects: Project[] = JSON.parse(fileContent)

    // Verifica se o slug já existe
    if (projects.some((p) => p.slug === body.slug)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Já existe um projeto com este slug',
      })
    }

    // Cria novo projeto
    const newProject: Project = {
      id: Date.now().toString(),
      ...body,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    projects.push(newProject)

    // Salva no arquivo
    await writeFile(filePath, JSON.stringify(projects, null, 2), 'utf-8')

    return newProject
  } catch (error) {
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    console.error('Erro ao criar projeto:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Erro ao criar projeto',
    })
  }
})
