import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Explore = () => {
    const [users, setUsers] = useState([]);
    const { t } = useLanguage();

    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="container">
            <h1 style={{ marginBottom: '2rem' }}>{t('community')}</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                {users.map(user => (
                    <Link key={user.id} to={`/user/${user.id}`} style={{ textDecoration: 'none' }}>
                        <div className="glass-card" style={{
                            padding: '1.5rem',
                            textAlign: 'center',
                            transition: 'transform 0.2s',
                            cursor: 'pointer'
                        }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--primary), var(--success))',
                                margin: '0 auto 1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.5rem',
                                fontWeight: 'bold',
                                color: 'white'
                            }}>
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            <h3 style={{ margin: 0, color: 'var(--text-color)' }}>{user.username}</h3>
                            {user.table_name && <p style={{ margin: '0.5rem 0 0', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 500 }}>{user.table_name}</p>}
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Explore;
