import { useState } from 'react';
import { Menu, X, Mail, Users, Settings, Home, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
        <div className="layout-container">
            {/* Mobile Header */}
            <header className="mobile-header">
                <button className="menu-btn" onClick={toggleSidebar}>
                    <Menu size={24} />
                </button>
                <span className="brand-name">MailerPro</span>
            </header>

            {/* Sidebar */}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <div className="brand">
                        <div className="brand-icon">
                            <Mail size={20} color="white" />
                        </div>
                        <span>MailerPro</span>
                    </div>
                    <button className="close-btn" onClick={toggleSidebar}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item, index) => (
                        <a key={index} href="#" className={`nav-item ${item.active ? 'active' : ''}`}>
                            <item.icon size={20} />
                            <span>{item.label}</span>
                            {item.active && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="active-indicator"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </a>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button className="nav-item logout">
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
                        className="backdrop"
                        onClick={toggleSidebar}
                    />
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="main-content">
                {children}
            </main>
        </div>
    );
}
