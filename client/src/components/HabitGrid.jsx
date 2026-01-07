import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';


const HabitGrid = ({ habits, onToggle, onDelete, readOnly = false }) => {
    const { t } = useLanguage();

    // Calculate start of the current week (Monday)
    const today = new Date();
    const currentDay = today.getDay() || 7; // Make Sunday 7 instead of 0
    const monday = new Date(today);
    monday.setDate(today.getDate() - currentDay + 1);

    const daysInView = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        return d.toISOString().split('T')[0];
    });

    const todayStr = today.toISOString().split('T')[0];

    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: 'auto', borderCollapse: 'separate', borderSpacing: '0 0.5rem' }}>
                <thead>
                    <tr>
                        <th style={{ textAlign: 'left', padding: '1rem', color: 'var(--secondary)', minWidth: '150px' }}>{t('habitHeader')}</th>
                        {daysInView.map(date => (
                            <th key={date} style={{ padding: '0.5rem', fontSize: '0.75rem', color: 'var(--secondary)', width: '30px', textAlign: 'center' }}>
                                {date.slice(8, 10)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {habits.map(habit => {
                        const status = JSON.parse(habit.status || '{}');
                        return (
                            <tr key={habit.id} style={{ background: 'rgba(30, 41, 59, 0.3)' }}>
                                <td style={{ padding: '1rem', borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem' }}>
                                    {habit.name}
                                </td>
                                {daysInView.map((date, idx) => {
                                    const isCompleted = status[date];
                                    const isLast = idx === daysInView.length - 1;
                                    const isFuture = date > todayStr;
                                    const isDisabled = readOnly || isFuture;

                                    return (
                                        <td
                                            key={date}
                                            style={{
                                                textAlign: 'center',
                                                borderTopRightRadius: isLast ? '0.5rem' : 0,
                                                borderBottomRightRadius: isLast ? '0.5rem' : 0
                                            }}
                                        >
                                            <button
                                                disabled={isDisabled}
                                                onClick={() => onToggle(habit.id, date, !isCompleted)}
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    padding: 0,
                                                    borderRadius: '4px',
                                                    border: isCompleted ? 'none' : '1px solid var(--glass-border)',
                                                    background: isCompleted ? 'var(--success)' : 'transparent',
                                                    cursor: isDisabled ? 'default' : 'pointer',
                                                    opacity: isDisabled ? 0.3 : 1,
                                                    transition: 'all 0.2s'
                                                }}
                                            />
                                        </td>
                                    );
                                })}
                                {!readOnly && (
                                    <td style={{ padding: '0 0.5rem', verticalAlign: 'middle' }}>
                                        <button
                                            onClick={() => onDelete(habit.id)}
                                            style={{
                                                background: 'transparent',
                                                border: 'none',
                                                color: 'var(--error)',
                                                cursor: 'pointer',
                                                opacity: 0.6,
                                                padding: '4px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                transition: 'opacity 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.target.style.opacity = 1}
                                            onMouseLeave={(e) => e.target.style.opacity = 0.6}
                                            title={t('deleteHabit')}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 6h18"></path>
                                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                                            </svg>
                                        </button>
                                    </td>
                                )}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default HabitGrid;
