import type { FormEvent } from 'react';
import * as authService from '../services/auth.service.ts';
import { useMutation } from "@tanstack/react-query";
import styles from './Auth.module.css';
import {tokenRegister} from "../utils/tokenRegister.ts";

export default function Register() {
    const mutation = useMutation<any, any, Record<string, any>>({
        mutationFn: (formData) => authService.register(formData),
        onSuccess: (response) => {
            tokenRegister(response.data.token);
            console.log('Register successful');
        },
        onError: (err) => console.log('Register error:', err)
    });

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const dateBrute: string = data.get('birthDate') as string;
        data.set('birthDate', new Date(dateBrute).toISOString());
        const formData = Object.fromEntries(data);
        mutation.mutate(formData);
    }

    return (
        <div className={styles.authContainer} style={{ maxWidth: '600px' }}>
            <h1 className={styles.authTitle}>Create Account</h1>
            <p className={styles.authSubtitle}>Join MailerPro to start your campaigns</p>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Firstname</label>
                        <input className={styles.input} type="text" name="firstName" placeholder="John" required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Surname</label>
                        <input className={styles.input} type="text" name="surname" placeholder="Doe" required />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Username</label>
                    <input className={styles.input} type="text" name="username" placeholder="johndoe" required />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Email</label>
                    <input className={styles.input} type="email" name="email" placeholder="john@example.com" required />
                </div>

                <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Birthdate</label>
                        <input className={styles.input} type="date" name="birthDate" required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Phone number</label>
                        <input className={styles.input} type="text" name="phoneNumber" placeholder="+33..." required />
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label}>Address</label>
                    <input className={styles.input} type="text" name="address" placeholder="123 Main St..." required />
                </div>

                <div className={styles.grid}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Password</label>
                        <input className={styles.input} type="password" name="password" placeholder="••••••••" required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Confirm Password</label>
                        <input className={styles.input} type="password" name="confirmPassword" placeholder="••••••••" required />
                    </div>
                </div>

                <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? "Creating account..." : "Create Account"}
                </button>

                <p className={styles.footer}>
                    Already have an account? <a href="#" className={styles.link}>Sign in</a>
                </p>
            </form>
        </div>
    );
}
