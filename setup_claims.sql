-- 1. Crear tabla de reclamos
CREATE TABLE IF NOT EXISTS claims (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  thumbs_up int DEFAULT 0,
  thumbs_down int DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 2. Crear tabla de comentarios para reclamos
CREATE TABLE IF NOT EXISTS claim_comments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  claim_id uuid REFERENCES claims(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 3. Habilitar RLS
ALTER TABLE claims ENABLE ROW LEVEL SECURITY;
ALTER TABLE claim_comments ENABLE ROW LEVEL SECURITY;

-- 4. Crear políticas públicas
CREATE POLICY "Acceso público total para reclamos" 
ON claims FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY "Acceso público total para comentarios de reclamos" 
ON claim_comments FOR ALL 
USING (true) 
WITH CHECK (true);

-- 5. Funciones RPC para votos
CREATE OR REPLACE FUNCTION vote_claim(claim_id uuid, vote_type text)
RETURNS void AS $$
BEGIN
  IF vote_type = 'up' THEN
    UPDATE claims SET thumbs_up = thumbs_up + 1 WHERE id = claim_id;
  ELSIF vote_type = 'down' THEN
    UPDATE claims SET thumbs_down = thumbs_down + 1 WHERE id = claim_id;
  END IF;
END;
$$ LANGUAGE plpgsql;
