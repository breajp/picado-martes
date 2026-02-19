import { HISTORICAL_MATCHES, PLAYERS } from "@/data/historicalData";

export interface PlayerStats {
    name: string;
    wins: number;
    losses: number;
    totalGames: number;
    winRate: number;
    points: number;
}

export function getLeaderboard(): PlayerStats[] {
    const stats: Record<string, PlayerStats> = {};

    PLAYERS.forEach(player => {
        stats[player] = {
            name: player,
            wins: 0,
            losses: 0,
            totalGames: 0,
            winRate: 0,
            points: 0
        };
    });

    HISTORICAL_MATCHES.forEach(match => {
        Object.entries(match.results).forEach(([player, result]) => {
            if (stats[player]) {
                if (result === 1) {
                    stats[player].wins++;
                    stats[player].points += 3;
                } else if (result === -1) {
                    stats[player].losses++;
                }
                stats[player].totalGames++;
            }
        });
    });

    return Object.values(stats)
        .map(s => ({
            ...s,
            winRate: s.totalGames > 0 ? (s.wins / s.totalGames) * 100 : 0
        }))
        .sort((a, b) => b.points - a.points || b.winRate - a.winRate);
}

export function getHeadToHead(p1: string, p2: string) {
    let matchesTogether = 0;
    let togetherWins = 0;
    let togetherLosses = 0;

    let matchesAgainst = 0;
    let p1WinsAgainst = 0;
    let p2WinsAgainst = 0;

    HISTORICAL_MATCHES.forEach(match => {
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

export function getPlayerHistory(name: string) {
    let wins = 0;
    let games = 0;

    // Sort matches by date if they weren't
    const history = HISTORICAL_MATCHES
        .filter(m => m.results[name] !== undefined)
        .map(m => {
            if (m.results[name] === 1) wins++;
            games++;
            return {
                date: m.date.split('-').slice(1).join('/'), // DD/MM format
                winRate: Math.round((wins / games) * 100)
            };
        });

    return history;
}

export function getMatchHistory() {
    return HISTORICAL_MATCHES.map(match => {
        return {
            ...match,
            winners: Object.entries(match.results).filter(([_, res]) => res === 1).map(([n]) => n),
            losers: Object.entries(match.results).filter(([_, res]) => res === -1).map(([n]) => n),
            location: match.location || "Grun Club"
        };
    }).reverse();
}

export function getMergedHistory(p1: string, p2: string) {
    const dates = Array.from(new Set(HISTORICAL_MATCHES.map(m => m.date))).sort();

    let w1 = 0, g1 = 0;
    let w2 = 0, g2 = 0;

    const combined = dates.map(date => {
        const match = HISTORICAL_MATCHES.find(m => m.date === date);
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
            date: date.split('-').slice(1).join('/'),
            [p1]: g1 > 0 ? Math.round((w1 / g1) * 100) : 0,
            [p2]: g2 > 0 ? Math.round((w2 / g2) * 100) : 0
        };
    }).filter(d => d !== null);

    return combined;
}
