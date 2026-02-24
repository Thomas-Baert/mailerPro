import type { FormEvent } from 'react';
import * as authService from '../services/auth.service.ts';
import { useMutation } from "@tanstack/react-query";
import { tokenRegister } from '../utils/tokenRegister';
import { useNavigate } from 'react-router-dom';
import styles from './Auth.module.css';

export default function Login() {
    const navigate = useNavigate();

    function navigateToRegister() {
        navigate('/register');
    }

    function navigateToHome() {
        navigate('/');
    }

    const mutation = useMutation<any, any, Record<string, any>>({
        mutationFn: (identification) => authService.login(identification),
        onSuccess: (response) => {
            tokenRegister(response.data.token);
            console.log('Login successful');
            navigateToHome();
        },
        onError: (err) => console.log('Login error:', err)
    });

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        mutation.mutate(Object.fromEntries(data));
    }

    return (
        <div className={styles.authContainer}>
            <h1 className={styles.authTitle}>Welcome Back</h1>
            <p className={styles.authSubtitle}>Please enter your details to sign in</p>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Username</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter your username"
                        name="username"
                        required
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Password</label>
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="••••••••"
                        name="password"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? "Signing in..." : "Sign In"}
                </button>

                <p className={styles.footer} onClick={navigateToRegister}>
                    Don't have an account? <span className={styles.link}>Create one</span>
                </p>
            </form>
        </div>
    );
}