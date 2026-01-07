const FlameIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="url(#fireGradient)" stroke="none" style={{ marginLeft: '0.5rem' }}>
        <defs>
            <linearGradient id="fireGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f59e0b" /> {/* Amber-500 */}
                <stop offset="100%" stopColor="#ea580c" /> {/* Orange-600 */}
            </linearGradient>
        </defs>
        <path d="M12 2C10.5 4.5 7 8 7 12c0 3 2.5 5.5 5 5.5s5-2.5 5-5.5c0-4-3.5-7.5-5-10zm0 15c-1 0-1.8-.8-1.8-1.8 0-1 .8-1.8 1.8-1.8s1.8.8 1.8 1.8c0 1-.8 1.8-1.8 1.8z" />
        <path d="M12 22c4.97 0 9-4.03 9-9 0-3.5-2-6.5-5-8 1 1.5 2 3.5 2 5.5 0 3.31-2.69 6-6 6s-6-2.69-6-6c0-2 1-4 2-5.5-3 1.5-5 4.5-5 8 0 4.97 4.03 9 9 9z" opacity="0.6" />
    </svg>
);

export default FlameIcon;
