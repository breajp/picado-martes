'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';

interface PerformanceData {
    date: string;
    [key: string]: string | number;
}

export default function MultiPerformanceChart({
    data,
    players,
    colors = ["#ff7e4b", "#55daff"]
}: {
    data: PerformanceData[],
    players: string[],
    colors?: string[]
}) {
    return (
        <div className="w-full h-[400px] mt-12">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        {players.map((player, i) => (
                            <linearGradient key={player} id={`color-${player}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={colors[i]} stopOpacity={0.2} />
                                <stop offset="95%" stopColor={colors[i]} stopOpacity={0} />
                            </linearGradient>
                        ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#ffffff30', fontSize: 10, fontWeight: 'bold' }}
                        dy={10}
                    />
                    <YAxis
                        domain={[0, 100]}
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#ffffff30', fontSize: 10, fontWeight: 'bold' }}
                        tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#111',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '16px',
                            fontSize: '12px',
                            fontWeight: 'bold',
                            color: '#fff'
                        }}
                        cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                    />
                    {players.map((player, i) => (
                        <Area
                            key={player}
                            type="monotone"
                            dataKey={player}
                            stroke={colors[i]}
                            strokeWidth={4}
                            fillOpacity={1}
                            fill={`url(#color-${player})`}
                            animationDuration={2000}
                            name={player}
                        />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
