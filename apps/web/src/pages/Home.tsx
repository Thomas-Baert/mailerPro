import { motion } from 'framer-motion';
import { Mail, Users, TrendingUp, AlertCircle } from 'lucide-react';

export default function Home() {
    const stats = [
        { label: 'Total Emails Sent', value: '12,450', icon: Mail, color: '#3B82F6' },
        { label: 'Active Subscribers', value: '3,200', icon: Users, color: '#10B981' },
        { label: 'Open Rate', value: '24.8%', icon: TrendingUp, color: '#F59E0B' },
        { label: 'Bounce Rate', value: '1.2%', icon: AlertCircle, color: '#EF4444' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Dashboard</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Welcome back, here is your daily overview.</p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        style={{
                            background: 'var(--bg-card)',
                            padding: '1.5rem',
                            borderRadius: '16px',
                            border: '1px solid rgba(255,255,255,0.05)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem'
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'start'
                        }}>
                            <div style={{
                                background: `${stat.color}20`,
                                padding: '0.75rem',
                                borderRadius: '12px',
                                color: stat.color
                            }}>
                                <stat.icon size={24} />
                            </div>
                            <span style={{
                                background: '#10B98120',
                                color: '#10B981',
                                fontSize: '0.75rem',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '99px',
                                fontWeight: 600
                            }}>
                                +2.5%
                            </span>
                        </div>
                        <div>
                            <div style={{ fontSize: '2rem', fontWeight: 700 }}>{stat.value}</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{stat.label}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{
                background: 'var(--bg-card)',
                borderRadius: '16px',
                padding: '1.5rem',
                border: '1px solid rgba(255,255,255,0.05)'
            }}>
                <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Recent Activity</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '1rem',
                            background: 'rgba(255,255,255,0.02)',
                            borderRadius: '12px'
                        }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                background: 'var(--primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontSize: '0.875rem',
                                fontWeight: 700
                            }}>
                                MK
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 500 }}>Campaign "Summer Sale" sent</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>2 hours ago</div>
                            </div>
                            <div style={{ color: '#10B981', fontWeight: 500 }}>Completed</div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
