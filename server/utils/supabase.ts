import { createClient } from '@supabase/supabase-js'

export const getSupabaseServerClient = (event: Parameters<typeof useRuntimeConfig>[0]) => {
    const config = useRuntimeConfig(event)
    const supabaseUrl = config.supabaseUrl as string | undefined
    const supabaseServiceRoleKey = config.supabaseServiceRoleKey as string | undefined
    const supabaseAnonKey = config.supabaseAnonKey as string | undefined
    const supabaseKey = supabaseServiceRoleKey || supabaseAnonKey

    if (!supabaseUrl || !supabaseKey) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Configuração do Supabase ausente. Defina SUPABASE_URL (ou NUXT_PUBLIC_SUPABASE_URL) e SUPABASE_ANON_KEY (ou NUXT_PUBLIC_SUPABASE_ANON_KEY).',
        })
    }

    return createClient(supabaseUrl, supabaseKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    })
}
