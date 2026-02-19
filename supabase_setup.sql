-- 1. Crear la tabla de perfiles
CREATE TABLE IF NOT EXISTS player_profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text UNIQUE NOT NULL,
  photo_url text,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 2. Habilitar RLS (Seguridad de Nivel de Fila)
ALTER TABLE player_profiles ENABLE ROW LEVEL SECURITY;

-- 3. Crear política para que cualquiera pueda leer y escribir (para el picado)
-- Nota: En producción esto debería ser más restrictivo
CREATE POLICY "Acceso público total" 
ON player_profiles FOR ALL 
USING (true) 
WITH CHECK (true);

-- 4. Instrucción para Storage:
-- Recordá crear un Bucket llamado "player-photos" en la sección de Storage y marcarlo como PUBLIC.
