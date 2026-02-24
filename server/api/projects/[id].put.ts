import type { Project, ProjectUpdate } from '../../../../shared/types/Project'
import {
  mapProjectUpdateToSupabaseProjeto,
  mapSupabaseProjetoToProject,
  type SupabaseProjetoRow,
} from '../../utils/projectMapper'
import { getSupabaseServerClient } from '../../utils/supabase'
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
    const supabase = getSupabaseServerClient(event)

    const { data: currentProject, error: currentProjectError } = await supabase
      .from('projetos')
      .select('*')
      .eq('id', Number(id))
      .maybeSingle()

    if (currentProjectError) {
      throw createError({
        statusCode: 500,
        statusMessage: `Erro ao buscar projeto no Supabase: ${currentProjectError.message}`,
      })
    }

    if (!currentProject) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Projeto não encontrado',
      })
    }

    if (body.slug && body.slug !== currentProject.slug) {
      const { data: slugInUse, error: slugCheckError } = await supabase
        .from('projetos')
        .select('id')
        .eq('slug', body.slug)
        .neq('id', Number(id))
        .maybeSingle()

      if (slugCheckError) {
        throw createError({
          statusCode: 500,
          statusMessage: `Erro ao validar slug no Supabase: ${slugCheckError.message}`,
        })
      }

      if (slugInUse) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Já existe um projeto com este slug',
        })
      }
    }

    const payload = mapProjectUpdateToSupabaseProjeto(body)
    const { data: updatedProject, error: updateError } = await supabase
      .from('projetos')
      .update(payload)
      .eq('id', Number(id))
      .select('*')
      .single()

    if (updateError || !updatedProject) {
      throw createError({
        statusCode: 500,
        statusMessage: `Erro ao atualizar projeto no Supabase: ${updateError?.message || 'sem retorno de dados'}`,
      })
    }

    return mapSupabaseProjetoToProject(updatedProject as SupabaseProjetoRow)
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
