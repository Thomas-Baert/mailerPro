import { useState } from 'react';
import { Menu, X, Mail, Users, Settings, Home, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './MainLayout.module.css';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navItems = [
        { icon: Home, label: 'Dashboard', active: true },
        { icon: Mail, label: 'Campaigns', active: false },
        { icon: Users, label: 'Subscribers', active: false },
        { icon: Settings, label: 'Settings', active: false },
    ];

    return (
        <div className={styles['layout-container']}>
            {/* Mobile Header */}
            <header className={styles['mobile-header']}>
                <button className={styles['menu-btn']} onClick={toggleSidebar}>
                    <Menu size={24} />
                </button>
                <span className={styles['brand-name']}>MailerPro</span>
            </header>

            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
                <div className={styles['sidebar-header']}>
                    <div className={styles.brand}>
                        <div className={styles['brand-icon']}>
                            <Mail size={20} color="white" />
                        </div>
                        <span>MailerPro</span>
                    </div>
                    <button className={styles['close-btn']} onClick={toggleSidebar}>
                        <X size={24} />
                    </button>
                </div>

                <nav className={styles['sidebar-nav']}>
                    {navItems.map((item, index) => (
                        <a key={index} href="#" className={`${styles['nav-item']} ${item.active ? styles.active : ''}`}>
                            <item.icon size={20} />
                            <span>{item.label}</span>
                            {item.active && (
                                <motion.div
                                    layoutId="active-pill"
                                    className={styles['active-indicator']}
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </a>
                    ))}
                </nav>

                <div className={styles['sidebar-footer']}>
                    <button className={`${styles['nav-item']} ${styles.logout}`}>
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Backdrop */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={styles.backdrop}
                        onClick={toggleSidebar}
                    />
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className={styles['main-content']}>
                {children}
            </main>
        </div>
    );
}
