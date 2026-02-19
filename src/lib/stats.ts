import { HISTORICAL_MATCHES, PLAYERS } from "@/data/historicalData";

export interface PlayerStats {
    name: string;
    wins: number;
    losses: number;
    totalGames: number;
    winRate: number;
    points: number;
    morfiGames: number;
    morfiRate: number;
}

export function getLeaderboard(year?: number): PlayerStats[] {
    const stats: Record<string, PlayerStats> = {};
    const matches = year ? HISTORICAL_MATCHES.filter(m => m.year === year) : HISTORICAL_MATCHES;

    PLAYERS.forEach(player => {
        stats[player] = {
            name: player,
            wins: 0,
            losses: 0,
            totalGames: 0,
            winRate: 0,
            points: 0,
            morfiGames: 0,
            morfiRate: 0
        };
    });

    matches.forEach(match => {
        Object.entries(match.results).forEach(([player, result]) => {
            if (stats[player]) {
                if (result === 1) {
                    stats[player].wins++;
                    stats[player].points += 3;
                } else if (result === -1) {
                    stats[player].losses++;
                    stats[player].points -= 1;
                }
                stats[player].totalGames++;

                // Cálculo de Morfi
                if (match.morfi?.includes(player)) {
                    stats[player].morfiGames++;
                }
            }
        });
    });

    return Object.values(stats)
        .map(s => ({
            ...s,
            winRate: s.totalGames > 0 ? (s.wins / s.totalGames) * 100 : 0,
            morfiRate: s.totalGames > 0 ? (s.morfiGames / s.totalGames) * 100 : 0
        }))
        .filter(s => s.totalGames > 0)
        .sort((a, b) => b.points - a.points || b.winRate - a.winRate);
}

export function getHeadToHead(p1: string, p2: string, year?: number) {
    let matchesTogether = 0;
    let togetherWins = 0;
    let togetherLosses = 0;

    let matchesAgainst = 0;
    let p1WinsAgainst = 0;
    let p2WinsAgainst = 0;

    const matches = year ? HISTORICAL_MATCHES.filter(m => m.year === year) : HISTORICAL_MATCHES;

    matches.forEach(match => {
        const r1 = match.results[p1];
        const r2 = match.results[p2];

        if (r1 !== undefined && r2 !== undefined) {
            if (r1 === r2) {
                matchesTogether++;
                if (r1 === 1) togetherWins++;
                else if (r1 === -1) togetherLosses++;
            } else {
                matchesAgainst++;
                if (r1 === 1) p1WinsAgainst++;
                else if (r2 === 1) p2WinsAgainst++;
            }
        }
    });

    return {
        matchesTogether,
        togetherWins,
        togetherLosses,
        matchesAgainst,
        p1WinsAgainst,
        p2WinsAgainst
    };
}

export function getPlayerHistory(name: string, year?: number) {
    let wins = 0;
    let games = 0;

    const matches = year ? HISTORICAL_MATCHES.filter(m => m.year === year) : HISTORICAL_MATCHES;

    const history = matches
        .filter(m => m.results[name] !== undefined)
        .map(m => {
            if (m.results[name] === 1) wins++;
            games++;
            return {
                date: `${m.date}/${m.year.toString().slice(-2)}`,
                winRate: Math.round((wins / games) * 100)
            };
        });

    return history;
}

export function getMatchHistory(year?: number) {
    const matches = year ? HISTORICAL_MATCHES.filter(m => m.year === year) : HISTORICAL_MATCHES;

    return matches.map(match => {
        return {
            ...match,
            winners: Object.entries(match.results).filter(([_, res]) => res === 1).map(([n]) => n),
            losers: Object.entries(match.results).filter(([_, res]) => res === -1).map(([n]) => n),
            location: match.location || "Grun Club"
        };
    }).reverse();
}

export function getMergedHistory(p1: string, p2: string, year?: number) {
    const matches = year ? HISTORICAL_MATCHES.filter(m => m.year === year) : HISTORICAL_MATCHES;
    const dates = Array.from(new Set(matches.map(m => m.date))).sort();

    let w1 = 0, g1 = 0;
    let w2 = 0, g2 = 0;

    const combined = dates.map(date => {
        const match = matches.find(m => m.date === date);
        if (!match) return null;

        if (match.results[p1] !== undefined) {
            if (match.results[p1] === 1) w1++;
            g1++;
        }
        if (match.results[p2] !== undefined) {
            if (match.results[p2] === 1) w2++;
            g2++;
        }

        return {
            date: `${date}/${match.year.toString().slice(-2)}`,
            [p1]: g1 > 0 ? Math.round((w1 / g1) * 100) : 0,
            [p2]: g2 > 0 ? Math.round((w2 / g2) * 100) : 0
        };
    }).filter(d => d !== null);

    return combined;
}
export function getPlayerSynergy(name: string, year?: number) {
    const synergy: Record<string, { games: number, wins: number }> = {};
    const rivals: Record<string, { games: number, losses: number }> = {};

    const matches = year ? HISTORICAL_MATCHES.filter(m => m.year === year) : HISTORICAL_MATCHES;

    matches.forEach(match => {
        const playerResult = match.results[name];
        if (playerResult === undefined) return;

        Object.entries(match.results).forEach(([otherPlayer, otherResult]) => {
            if (otherPlayer === name) return;

            if (playerResult === otherResult) {
                // Partner
                if (!synergy[otherPlayer]) synergy[otherPlayer] = { games: 0, wins: 0 };
                synergy[otherPlayer].games++;
                if (playerResult === 1) synergy[otherPlayer].wins++;
            } else {
                // Rival
                if (!rivals[otherPlayer]) rivals[otherPlayer] = { games: 0, losses: 0 };
                rivals[otherPlayer].games++;
                if (playerResult === -1) rivals[otherPlayer].losses++;
            }
        });
    });

    const bestPartners = Object.entries(synergy)
        .map(([playerName, data]) => ({
            name: playerName,
            winRate: (data.wins / data.games) * 100,
            games: data.games
        }))
        .filter(p => p.games >= 2) // Mínimo 2 partidos juntos
        .sort((a, b) => b.winRate - a.winRate || b.games - a.games)
        .slice(0, 3);

    const worstRivals = Object.entries(rivals)
        .map(([playerName, data]) => ({
            name: playerName,
            lossRate: (data.losses / data.games) * 100,
            games: data.games
        }))
        .filter(r => r.games >= 2)
        .sort((a, b) => b.lossRate - a.lossRate || b.games - a.games)
        .slice(0, 3);

    return { bestPartners, worstRivals };
}
export function getGlobalStats(year: number) {
    const leaderboard = getLeaderboard(year);
    const matches = HISTORICAL_MATCHES.filter(m => m.year === year);

    const totalMatches = matches.length;
    const topPlayer = leaderboard[0];
    const mostWins = leaderboard.reduce((max, p) => p.wins > max.wins ? p : max, leaderboard[0]);
    const morfiMaster = [...leaderboard].sort((a, b) => b.morfiRate - a.morfiRate)[0];

    return {
        totalMatches,
        topPlayer,
        mostWins,
        morfiMaster,
        playerCount: PLAYERS.length
    };
}
