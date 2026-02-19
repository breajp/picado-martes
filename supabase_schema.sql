-- TABLA DE JUGADORES
CREATE TABLE players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- TABLA DE PARTIDOS
CREATE TABLE matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    date DATE NOT NULL,
    location TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    created_by UUID REFERENCES auth.users(id)
);

-- TABLA DE RESULTADOS (RELACIÓN MUCHOS A MUCHOS ENTRE PARTIDOS Y JUGADORES)
CREATE TABLE match_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
    player_id UUID REFERENCES players(id) ON DELETE CASCADE,
    result INTEGER CHECK (result IN (1, -1)), -- 1 gana, -1 pierde
    UNIQUE(match_id, player_id)
);

-- VISTASÚTILES PARA ESTADÍSTICAS
CREATE OR REPLACE VIEW player_stats AS
SELECT 
    p.id,
    p.name,
    COUNT(mr.id) as total_games,
    COUNT(CASE WHEN mr.result = 1 THEN 1 END) as wins,
    COUNT(CASE WHEN mr.result = -1 THEN 1 END) as losses,
    SUM(CASE WHEN mr.result = 1 THEN 3 ELSE 0 END) as points
FROM players p
LEFT JOIN match_results mr ON p.id = mr.player_id
GROUP BY p.id, p.name;

-- HABILITAR RLS (Seguridad)
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE match_results ENABLE ROW LEVEL SECURITY;

-- POLÍTICAS: CUALQUIERA PUEDE LEER
CREATE POLICY "Public Read Players" ON players FOR SELECT USING (true);
CREATE POLICY "Public Read Matches" ON matches FOR SELECT USING (true);
CREATE POLICY "Public Read Match Results" ON match_results FOR SELECT USING (true);

-- POLÍTICAS: SOLO ADMINS PUEDEN ESCRIBIR (Para simplificar, permitimos a autenticados por ahora)
CREATE POLICY "Authenticated Write Players" ON players FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated Write Matches" ON matches FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated Write Match Results" ON match_results FOR ALL USING (auth.role() = 'authenticated');
