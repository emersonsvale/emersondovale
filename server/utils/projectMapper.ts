import type { Project, ProjectInsert, ProjectUpdate } from '../../shared/types/Project'

export interface SupabaseProjetoRow {
    id: number
    created_at: string | null
    titulo: string | null
    descricao: string | null
    imgens: string[] | null
    capa: string | null
    h2: string | null
    categoria_projeto: number[] | null
    ferramentas: number[] | null
    likes: number | null
    link_web: string | null
    link_google: string | null
    link_apple: string | null
    ranking: number | null
    mobile: boolean | null
    imagem_celular: string | null
    imagem_pc: string | null
    parceiro: string | null
    desafio: string | null
    slug: string | null
    valeapps: boolean | null
}

const toNullableString = (value?: string | null) => {
    if (!value) return null
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : null
}

const parseNumericArray = (values?: string[] | null): number[] | null => {
    if (!values || values.length === 0) return null

    const parsed = values
        .map((value) => Number.parseInt(value, 10))
        .filter((value) => Number.isInteger(value))

    return parsed.length > 0 ? parsed : null
}

export const mapSupabaseProjetoToProject = (row: SupabaseProjetoRow): Project => {
    const image = row.capa || row.imagem_pc || row.imagem_celular || row.imgens?.[0] || null

    return {
        id: String(row.id),
        title: row.titulo || '',
        description: row.descricao || '',
        slug: row.slug || '',
        image,
        category: row.mobile === true ? 'Mobile App' : row.mobile === false && row.link_web ? 'Web App' : null,
        featured: Boolean(row.valeapps),
        content: row.h2 || row.desafio || null,
        technologies: row.ferramentas?.map(String) || null,
        link_web: row.link_web || null,
        link_google: row.link_google || null,
        link_apple: row.link_apple || null,
        created_at: row.created_at || undefined,
    }
}

export const mapProjectInsertToSupabaseProjeto = (project: ProjectInsert): Partial<SupabaseProjetoRow> => {
    const image = toNullableString(project.image)

    return {
        titulo: project.title,
        descricao: project.description,
        slug: project.slug,
        capa: image,
        imgens: image ? [image] : null,
        h2: toNullableString(project.content),
        ferramentas: parseNumericArray(project.technologies),
        link_web: toNullableString(project.link_web),
        link_google: toNullableString(project.link_google),
        link_apple: toNullableString(project.link_apple),
        valeapps: Boolean(project.featured),
        mobile: project.category?.toLowerCase().includes('mobile') || null,
    }
}

export const mapProjectUpdateToSupabaseProjeto = (project: ProjectUpdate): Partial<SupabaseProjetoRow> => {
    const payload: Partial<SupabaseProjetoRow> = {}

    if (project.title !== undefined) payload.titulo = project.title
    if (project.description !== undefined) payload.descricao = project.description
    if (project.slug !== undefined) payload.slug = project.slug

    if (project.image !== undefined) {
        payload.capa = toNullableString(project.image)
        payload.imgens = payload.capa ? [payload.capa] : null
    }

    if (project.content !== undefined) payload.h2 = toNullableString(project.content)
    if (project.technologies !== undefined) payload.ferramentas = parseNumericArray(project.technologies)
    if (project.link_web !== undefined) payload.link_web = toNullableString(project.link_web)
    if (project.link_google !== undefined) payload.link_google = toNullableString(project.link_google)
    if (project.link_apple !== undefined) payload.link_apple = toNullableString(project.link_apple)
    if (project.featured !== undefined) payload.valeapps = Boolean(project.featured)
    if (project.category !== undefined) payload.mobile = project.category?.toLowerCase().includes('mobile') || null

    return payload
}
