import { readFile } from 'fs/promises'
import { join } from 'path'
import type { Project } from '../../../../shared/types/Project'

export default defineEventHandler(async (event): Promise<Project> => {
  try {
    // Extrai o slug da URL - formato: /api/projects/sistema-gestao-portfolio
    const url = event.node.req.url || ''
    const urlParts = url.split('/').filter(Boolean)
    const slugIndex = urlParts.indexOf('projects')
    const slug = slugIndex >= 0 && urlParts[slugIndex + 1] ? urlParts[slugIndex + 1] : null
    
    // Fallback: tenta getRouterParam (pode funcionar em algumas versões)
    const routerSlug = getRouterParam(event, 'slug')
    const finalSlug = routerSlug || slug
    
    console.log('🔍 [DEBUG] URL completa:', url)
    console.log('🔍 [DEBUG] URL parts:', urlParts)
    console.log('🔍 [DEBUG] Router param slug:', routerSlug)
    console.log('🔍 [DEBUG] Slug extraído da URL:', slug)
    console.log('🔍 [DEBUG] Slug final usado:', finalSlug)
    
    if (!finalSlug) {
      console.error('❌ [ERROR] Slug não encontrado na requisição')
      throw createError({
        statusCode: 400,
        statusMessage: 'Slug é obrigatório',
      })
    }

    const filePath = join(process.cwd(), 'data', 'projects.json')
    
    // Verifica se o arquivo existe
    let fileContent: string
    try {
      fileContent = await readFile(filePath, 'utf-8')
    } catch (fileError: any) {
      console.error('❌ [ERROR] Erro ao ler arquivo:', fileError)
      throw createError({
        statusCode: 500,
        statusMessage: `Erro ao ler arquivo de projetos: ${fileError.message}`,
      })
    }

    // Verifica se o arquivo está vazio
    if (!fileContent || fileContent.trim() === '' || fileContent.trim() === '[]') {
      console.error('❌ [ERROR] Arquivo de projetos está vazio')
      throw createError({
        statusCode: 404,
        statusMessage: 'Nenhum projeto encontrado. O arquivo está vazio.',
      })
    }

    let projects: Project[]
    try {
      projects = JSON.parse(fileContent)
    } catch (parseError: any) {
      console.error('❌ [ERROR] Erro ao fazer parse do JSON:', parseError)
      throw createError({
        statusCode: 500,
        statusMessage: `Erro ao processar arquivo JSON: ${parseError.message}`,
      })
    }

    // Verifica se projects é um array válido
    if (!Array.isArray(projects)) {
      console.error('❌ [ERROR] Arquivo não contém um array válido')
      throw createError({
        statusCode: 500,
        statusMessage: 'Formato inválido: projetos deve ser um array',
      })
    }
    
    // Debug: log dos slugs disponíveis e o slug buscado
    console.log('🔍 [DEBUG] Slug recebido:', finalSlug)
    console.log('🔍 [DEBUG] Total de projetos:', projects.length)
    console.log('🔍 [DEBUG] Slugs disponíveis:', projects.map(p => p.slug))
    console.log('🔍 [DEBUG] Caminho do arquivo:', filePath)
    
    const project = projects.find((p) => p.slug === finalSlug)
    
    console.log('🔍 [DEBUG] Projeto encontrado:', project ? 'SIM' : 'NÃO')
    if (project) {
      console.log('🔍 [DEBUG] Título do projeto:', project.title)
    }

    if (!project) {
      console.log('❌ [ERROR] Projeto não encontrado para slug:', finalSlug)
      throw createError({
        statusCode: 404,
        statusMessage: `Projeto não encontrado para o slug: ${finalSlug}`,
      })
    }

    return project
  } catch (error: any) {
    // Se já é um erro do H3, apenas relança
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }
    // Para outros erros, loga e cria um erro genérico
    console.error('❌ [ERROR] Erro ao buscar projeto:', error)
    throw createError({
      statusCode: 500,
      statusMessage: `Erro ao carregar projeto: ${error?.message || 'Erro desconhecido'}`,
    })
  }
})
