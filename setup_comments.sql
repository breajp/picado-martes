-- 1. Crear tabla de comentarios para jugadas
CREATE TABLE IF NOT EXISTS highlight_comments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  highlight_id uuid REFERENCES player_highlights(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 2. Habilitar RLS (Seguridad de Nivel de Fila)
ALTER TABLE highlight_comments ENABLE ROW LEVEL SECURITY;

-- 3. Crear política para que cualquiera pueda leer y escribir comentarios
CREATE POLICY "Acceso público total para comentarios" 
ON highlight_comments FOR ALL 
USING (true) 
WITH CHECK (true);
