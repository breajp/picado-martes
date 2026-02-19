import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { HISTORICAL_MATCHES, PLAYERS } from '../data/historicalData.js';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

async function migrate() {
    console.log('🚀 Starting migration...');

    // 1. Insert Players
    console.log('👥 Inserting players...');
    const { data: existingPlayers } = await supabase.from('players').select('name');
    const existingNames = new Set(existingPlayers?.map(p => p.name) || []);

    const playersToInsert = PLAYERS.filter(p => !existingNames.has(p)).map(name => ({ name }));

    if (playersToInsert.length > 0) {
        const { error: pError } = await supabase.from('players').insert(playersToInsert);
        if (pError) console.error('Error inserting players:', pError);
    }

    // Fetch all players to get IDs
    const { data: allPlayers } = await supabase.from('players').select('id, name');
    const playerMap = Object.fromEntries(allPlayers?.map(p => [p.name, p.id]) || []);

    // 2. Insert Matches and Results
    console.log('⚽ Inserting matches and results...');
    for (const matchData of HISTORICAL_MATCHES) {
        // Basic date parsing (DD/MM) - Assuming 2025 as the year
        const [day, month] = matchData.date.split('/');
        const dateInput = `2025-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;

        const { data: match, error: mError } = await supabase
            .from('matches')
            .insert({
                date: dateInput,
                location: matchData.location
            })
            .select()
            .single();

        if (mError) {
            console.error(`Error inserting match ${matchData.date}:`, mError);
            continue;
        }

        const resultsToInsert = Object.entries(matchData.results)
            .filter(([name, res]) => res !== null && playerMap[name])
            .map(([name, res]) => ({
                match_id: match.id,
                player_id: playerMap[name],
                result: res
            }));

        if (resultsToInsert.length > 0) {
            const { error: rError } = await supabase.from('match_results').insert(resultsToInsert);
            if (rError) console.error(`Error inserting results for ${matchData.date}:`, rError);
        }
    }

    console.log('✅ Migration finished!');
}

migrate();
