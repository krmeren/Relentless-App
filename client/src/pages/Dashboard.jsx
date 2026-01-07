import { useState, useEffect } from 'react';
import HabitGrid from '../components/HabitGrid';
import HabitChart from '../components/HabitChart';
import ConfirmModal from '../components/ConfirmModal';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Dashboard = () => {
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState('');
    const [tableName, setTableName] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [habitToDelete, setHabitToDelete] = useState(null);

    const { user, token } = useAuth();
    const authHeaders = { 'Authorization': `Bearer ${localStorage.getItem('token')}` };
    const { t } = useLanguage();

    useEffect(() => {
        fetchHabits();
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const res = await fetch(`/api/users/${user.id}/habits`);
            const data = await res.json();
            if (data.user && data.user.table_name) {
                setTableName(data.user.table_name);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const updateTableName = async () => {
        try {
            await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeaders
                },
                body: JSON.stringify({ table_name: tableName })
            });
            setIsEditingName(false);
        } catch (error) {
            console.error('Failed to update table name', error);
        }
    };

    const fetchHabits = async () => {
        try {
            const res = await fetch('/api/habits', {
                headers: authHeaders
            });
            const data = await res.json();
            setHabits(data);
        } catch (err) {
            console.error(err);
        }
    };

    const addHabit = async (e) => {
        e.preventDefault();
        if (!newHabit.trim()) return;

        try {
            const res = await fetch('/api/habits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeaders
                },
                body: JSON.stringify({ name: newHabit })
            });
            const data = await res.json();
            setHabits([...habits, data]);
            setNewHabit('');
        } catch (err) {
            console.error(err);
        }
    };

    const confirmDelete = (habitId) => {
        setHabitToDelete(habitId);
        setIsModalOpen(true);
    };

    const executeDelete = async () => {
        if (!habitToDelete) return;

        try {
            const res = await fetch(`/api/habits/${habitToDelete}`, {
                method: 'DELETE',
                headers: authHeaders
            });

            if (res.ok) {
                setHabits(habits.filter(h => h.id !== habitToDelete));
            }
        } catch (error) {
            console.error(t('errorPrefix'), error);
        } finally {
            setIsModalOpen(false);
            setHabitToDelete(null);
        }
    };

    const toggleHabit = async (id, date, isCompleted) => {
        const updatedHabits = habits.map(h => {
            if (h.id === id) {
                const status = JSON.parse(h.status || '{}');
                status[date] = isCompleted;
                return { ...h, status: JSON.stringify(status) };
            }
            return h;
        });
        setHabits(updatedHabits);

        try {
            const habit = updatedHabits.find(h => h.id === id);
            await fetch(`/api/habits/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeaders
                },
                body: JSON.stringify({ status: JSON.parse(habit.status) })
            });
        } catch (err) {
            console.error('Failed to update habit', err);
        }
    };

    return (
        <div className="container">
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={executeDelete}
                title={t('deleteHabitTitle')}
                message={t('deleteHabitMessage')}
            />

            <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {isEditingName ? (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input
                            type="text"
                            className="input-field"
                            value={tableName}
                            onChange={(e) => setTableName(e.target.value)}
                            placeholder="Set a Table Name (e.g., GYMRAT)"
                            style={{ width: '300px' }}
                        />
                        <button onClick={updateTableName} className="btn-primary">Save</button>
                    </div>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => setIsEditingName(true)}>
                        <h1 style={{ margin: 0, background: 'linear-gradient(to right, var(--primary), var(--success))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '2rem' }}>
                            {tableName || t('welcomeUser', { name: user.username })}
                        </h1>
                        <span style={{ fontSize: '1rem', opacity: 0.5, marginLeft: '0.5rem' }}>✎</span>
                    </div>
                )}
            </div>

            <div className="glass-card" style={{ marginBottom: '2rem' }}>
                <p style={{ color: 'var(--secondary)' }}>{t('trackHabits')}</p>

                <form onSubmit={addHabit} style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                    <input
                        type="text"
                        className="input-field"
                        placeholder={t('addHabitPlaceholder')}
                        value={newHabit}
                        onChange={(e) => setNewHabit(e.target.value)}
                        style={{ maxWidth: '400px' }}
                    />
                    <button type="submit" className="btn-primary">{t('addHabitBtn')}</button>
                </form>
            </div>

            <div className="glass-card">
                <h2 style={{ marginBottom: '1.5rem' }}>{t('yourHabits')}</h2>
                {habits.length > 0 ? (
                    <>
                        <HabitGrid habits={habits} onToggle={toggleHabit} onDelete={confirmDelete} />
                        <HabitChart habits={habits} />
                    </>
                ) : (
                    <p style={{ color: 'var(--secondary)', textAlign: 'center', padding: '2rem' }}>
                        {t('noHabitsYet')}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
