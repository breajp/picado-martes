import { getLeaderboard } from "@/lib/stats";

export default function Leaderboard() {
    const stats = getLeaderboard();

    return (
        <div className="w-full overflow-x-auto glass rounded-2xl animate-fade-in shadow-lg">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-card-border bg-white/5">
                        <th className="px-6 py-4 font-semibold text-gray-400 text-sm uppercase">Pos</th>
                        <th className="px-6 py-4 font-semibold text-gray-400 text-sm uppercase">Jugador</th>
                        <th className="px-6 py-4 font-semibold text-gray-400 text-sm uppercase">Pts</th>
                        <th className="px-6 py-4 font-semibold text-gray-400 text-sm uppercase">PJ</th>
                        <th className="px-6 py-4 font-semibold text-gray-400 text-sm uppercase">G</th>
                        <th className="px-6 py-4 font-semibold text-gray-400 text-sm uppercase">P</th>
                        <th className="px-6 py-4 font-semibold text-gray-400 text-sm uppercase">% Win</th>
                    </tr>
                </thead>
                <tbody>
                    {stats.map((player, index) => (
                        <tr
                            key={player.name}
                            className="border-b border-card-border/50 hover:bg-white/5 transition-colors group"
                        >
                            <td className="px-6 py-6 font-mono text-gray-500">
                                {(index + 1).toString().padStart(2, '0')}
                            </td>
                            <td className="px-6 py-6">
                                <div className="font-bold text-lg group-hover:text-primary transition-colors">
                                    {player.name}
                                </div>
                            </td>
                            <td className="px-6 py-6">
                                <span className="bg-primary/20 text-primary px-3 py-1 rounded-lg font-bold">
                                    {player.points}
                                </span>
                            </td>
                            <td className="px-6 py-6 font-medium">{player.totalGames}</td>
                            <td className="px-6 py-6 text-emerald-400">{player.wins}</td>
                            <td className="px-6 py-6 text-rose-400">{player.losses}</td>
                            <td className="px-6 py-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary"
                                            style={{ width: `${player.winRate}%` }}
                                        />
                                    </div>
                                    <span className="text-sm font-mono">{player.winRate.toFixed(0)}%</span>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
