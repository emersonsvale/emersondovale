import type { Project, ProjectInsert } from '../../../shared/types/Project'
import {
  mapProjectInsertToSupabaseProjeto,
  mapSupabaseProjetoToProject,
  type SupabaseProjetoRow,
} from '../utils/projectMapper'
import { getSupabaseServerClient } from '../utils/supabase'
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

    const supabase = getSupabaseServerClient(event)

    const { data: existingProject, error: existingProjectError } = await supabase
      .from('projetos')
      .select('id')
      .eq('slug', body.slug)
      .maybeSingle()

    if (existingProjectError) {
      throw createError({
        statusCode: 500,
        statusMessage: `Erro ao validar slug no Supabase: ${existingProjectError.message}`,
      })
    }

    if (existingProject) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Já existe um projeto com este slug',
      })
    }

    const payload = mapProjectInsertToSupabaseProjeto(body)
    const { data, error } = await supabase
      .from('projetos')
      .insert(payload)
      .select('*')
      .single()

    if (error || !data) {
      throw createError({
        statusCode: 500,
        statusMessage: `Erro ao criar projeto no Supabase: ${error?.message || 'sem retorno de dados'}`,
      })
    }

    return mapSupabaseProjetoToProject(data as SupabaseProjetoRow)
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
