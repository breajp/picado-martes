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
    let p1Wins = 0;
    let p2Wins = 0;
    let matchesTogether = 0;
    let matchesAgainst = 0;
    let p1WinsAgainst = 0;
    let p2WinsAgainst = 0;

    HISTORICAL_MATCHES.forEach(match => {
        const r1 = match.results[p1];
        const r2 = match.results[p2];

        if (r1 !== undefined && r2 !== undefined && r1 !== null && r2 !== null) {
            if (r1 === r2) {
                matchesTogether++;
                if (r1 === 1) {
                    // Both won
                }
            } else {
                matchesAgainst++;
                if (r1 === 1) p1WinsAgainst++;
                else p2WinsAgainst++;
            }
        }
    });

    return {
        matchesTogether,
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
