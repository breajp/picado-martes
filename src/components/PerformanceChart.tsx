'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';

interface DataPoint {
    date: string;
    winRate: number;
}

export default function PerformanceChart({ data }: { data: DataPoint[] }) {
    return (
        <div className="w-full h-[300px] mt-12">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorWinRate" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ff7e4b" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#ff7e4b" stopOpacity={0} />
                        </linearGradient>
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
                        itemStyle={{ color: '#ff7e4b' }}
                        cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                    />
                    <Area
                        type="monotone"
                        dataKey="winRate"
                        stroke="#ff7e4b"
                        strokeWidth={4}
                        fillOpacity={1}
                        fill="url(#colorWinRate)"
                        animationDuration={2000}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
