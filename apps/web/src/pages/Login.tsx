import type { FormEvent } from 'react';
import axios from 'axios';
import { useMutation } from "@tanstack/react-query";
import styles from './Auth.module.css';

export default function Login() {
    const mutation = useMutation<any, any, Record<string, any>>({
        mutationFn: (identification) => axios.post('/mailerpro-api/api/auth/login', identification),
        onSuccess: (data) => console.log('Login successful:', data),
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

                <p className={styles.footer}>
                    Don't have an account? <a href="#" className={styles.link}>Create one</a>
                </p>
            </form>
        </div>
    );
}