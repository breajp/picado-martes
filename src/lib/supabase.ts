import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Solo inicializamos si las variables existen para no romper el build de Vercel
export const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/**
 * Tabla sugerida en Supabase:
 * 
 * TABLE player_profiles (
 *   id dev_uuid primary key default uuid_generate_v4(),
 *   name text unique not null,
 *   photo_url text,
 *   updated_at timestamp with time zone default timezone('utc'::text, now())
 * )
 * 
 * BUCKET sugerido: "player-photos" (público)
 */
