import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HabitGrid from '../components/HabitGrid';
import HabitChart from '../components/HabitChart';
import { useLanguage } from '../context/LanguageContext';

const UserView = () => {
    const { userId } = useParams();
    const [targetUser, setTargetUser] = useState(null);
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        fetch(`/api/users/${userId}/habits`)
            .then(res => res.json())
            .then(data => {
                setTargetUser(data.user);
                setHabits(data.habits);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [userId]);

    if (loading) return <div className="container">{t('loading')}</div>;
    if (!targetUser) return <div className="container">{t('userNotFound')}</div>;

    return (
        <div className="container">
            <div className="glass-card" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--primary), var(--success))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: 'white'
                }}>
                    {targetUser.username.charAt(0).toUpperCase()}
                </div>
                <div>
                    <h1 style={{ margin: 0 }}>{targetUser.table_name || t('viewingProfile', { name: targetUser.username })}</h1>
                    <p style={{ color: 'var(--secondary)', margin: '0.5rem 0 0' }}>{targetUser.table_name ? targetUser.username : t('publicProfile')}</p>
                </div>
            </div>

            <div className="glass-card">
                {habits.length > 0 ? (
                    <>
                        <HabitGrid habits={habits} readOnly={true} />
                        <HabitChart habits={habits} />
                    </>
                ) : (
                    <p style={{ color: 'var(--secondary)', textAlign: 'center', padding: '2rem' }}>
                        {t('userNoHabits')}
                    </p>
                )}
            </div>
        </div>
    );
};

export default UserView;
