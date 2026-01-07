import { useLanguage } from '../context/LanguageContext';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    const { t } = useLanguage();

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }} onClick={onClose}>
            <div className="glass-card" style={{
                maxWidth: '400px',
                width: '90%',
                padding: '2rem',
                border: '1px solid var(--glass-border)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }} onClick={e => e.stopPropagation()}>
                <h2 style={{ marginTop: 0, color: 'var(--text-heading)' }}>{title}</h2>
                <p style={{ color: 'var(--secondary)', marginBottom: '2rem' }}>{message}</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: '1px solid var(--secondary)',
                            color: 'var(--text-color)'
                        }}
                    >
                        {t('cancel')}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="btn-primary"
                        style={{ background: 'var(--danger)' }}
                    >
                        {t('confirm')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
