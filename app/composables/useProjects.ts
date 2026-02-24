import type { Project } from '../../shared/types/Project'

export const useProjects = () => {
  const projects = useState<Project[]>('projects', () => [])
  const loading = useState<boolean>('projects-loading', () => false)
  const error = useState<string | null>('projects-error', () => null)

  const fetchProjects = async () => {
    loading.value = true
    error.value = null

    try {
      const response = await $fetch<Project[]>('/api/projects', {
        timeout: 15000,
      })
      projects.value = response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao carregar projetos'
      projects.value = []
      console.error('Erro ao buscar projetos:', err)
    } finally {
      loading.value = false
    }
  }

  const getProjectBySlug = async (slug: string): Promise<Project | null> => {
    try {
      const response = await $fetch<Project>(`/api/projects/${slug}`)
      return response
    } catch (err) {
      console.error('Erro ao buscar projeto:', err)
      return null
    }
  }

  const createProject = async (project: Omit<Project, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await $fetch<Project>('/api/projects', {
        method: 'POST',
        body: project,
      })
      await fetchProjects()
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao criar projeto'
      throw err
    }
  }

  const updateProject = async (id: string, project: Partial<Project>) => {
    try {
      const response = await $fetch<Project>(`/api/projects/${id}`, {
        method: 'PUT',
        body: project,
      })
      await fetchProjects()
      return response
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao atualizar projeto'
      throw err
    }
  }

  const deleteProject = async (id: string) => {
    try {
      await $fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })
      await fetchProjects()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Erro ao deletar projeto'
      throw err
    }
  }

  return {
    projects: readonly(projects),
    loading: readonly(loading),
    error: readonly(error),
    fetchProjects,
    getProjectBySlug,
    createProject,
    updateProject,
    deleteProject,
  }
}
