import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/auth.service.ts";
import styles from './Home.module.css';

export default function Home() {
    const token = localStorage.getItem('token');

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['me'],
        queryFn: getMe,
        enabled: !!token
    });

    return (
        <div className={styles.container}>
            <section className={styles.hero}>
                <h1 className={styles.title}>L'e-mailing Intelligent pour vos Campagnes</h1>
                <p className={styles.subtitle}>
                    Gérez vos clients, automatisez vos envois et analysez vos résultats avec une interface intuitive et performante.
                </p>

                <div className={styles.actions}>
                    {!token || isError ? (
                        <>
                            <Link to="/login">
                                <button className={styles.primaryBtn}>Se connecter</button>
                            </Link>
                            <Link to="/register">
                                <button className={styles.secondaryBtn}>Créer un compte</button>
                            </Link>
                        </>
                    ) : (
                        <Link to="/dashboard">
                            <button className={styles.primaryBtn}>Aller au Dashboard</button>
                        </Link>
                    )}
                </div>
            </section>

            {token && !isError && user && (
                <div className={styles.userCard}>
                    <div className={styles.avatar}>
                        {user.username?.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.userInfo}>
                        <span className={styles.userLabel}>Connecté en tant que</span>
                        <span className={styles.userName}>{user.username}</span>
                    </div>
                </div>
            )}

            {isLoading && (
                <div className={styles.userCard}>
                    <span className={styles.userLabel}>Chargement du profil...</span>
                </div>
            )}
        </div>
    );
}
