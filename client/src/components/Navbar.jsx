import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import FlameIcon from './FlameIcon';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { t, language, toggleLanguage } = useLanguage();
    const location = useLocation();

    if (!user) return null;

    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="glass-card" style={{
            padding: '1rem',
            marginBottom: '2rem',
            borderRadius: '1rem',
            position: 'sticky',
            top: '1rem',
            zIndex: 100
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 0 }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    Relentless <FlameIcon />
                </Link>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>{t('dashboard')}</Link>
                    <Link to="/explore" className={`nav-link ${location.pathname === '/explore' ? 'active' : ''}`}>{t('explore')}</Link>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '1rem' }}>
                        <span style={{ color: 'var(--text-color)', opacity: 0.8, marginRight: '0.5rem', display: 'none' }}>{user.username}</span> {/* hidden on mobile usually but let's keep it simple */}

                        <button onClick={toggleTheme} style={{ background: 'transparent', padding: '0.5rem', fontSize: '1.2rem' }} title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>

                        <button onClick={toggleLanguage} style={{ background: 'transparent', padding: '0.5rem', border: '1px solid var(--glass-border)', color: 'var(--text-color)' }}>
                            {language === 'en' ? 'TR' : 'EN'}
                        </button>

                        <button onClick={logout} style={{ marginLeft: '0.5rem', background: 'rgba(239, 68, 68, 0.2)', color: 'var(--danger)' }}>
                            {t('logout')}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
