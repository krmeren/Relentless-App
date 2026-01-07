import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useLanguage } from '../context/LanguageContext';

const HabitChart = ({ habits }) => {
    const { t } = useLanguage();

    // Prepare data for the last 30 days
    const data = Array.from({ length: 30 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        const dateStr = d.toISOString().split('T')[0];

        let completedCount = 0;
        habits.forEach(habit => {
            const status = JSON.parse(habit.status || '{}');
            if (status[dateStr]) {
                completedCount++;
            }
        });

        return {
            date: dateStr.slice(8, 10), // Day of month
            fullDate: dateStr,
            count: completedCount
        };
    });

    return (
        <div style={{ width: '100%', height: 300, marginTop: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>{t('chartTitle')}</h3>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <XAxis
                        dataKey="date"
                        stroke="var(--secondary)"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis
                        hide
                    />
                    <Tooltip
                        contentStyle={{
                            background: 'rgba(15, 23, 42, 0.9)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '0.5rem',
                            color: 'var(--text-color)'
                        }}
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill="var(--primary)" fillOpacity={0.6 + (entry.count / (habits.length || 1)) * 0.4} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HabitChart;
