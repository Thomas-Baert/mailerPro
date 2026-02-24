import type { FormEvent } from 'react';
import axios from 'axios';
import {useMutation} from "@tanstack/react-query";

export default function Login() {
    const mutation = useMutation<any, any, Record<string, any>>({
        mutationFn: (identification) => axios.post('/api/login', identification),
        onSuccess: (data) => console.log('Login successful:', data),
        onError: (err) => console.log('Login error:', err)
    });

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        mutation.mutate(Object.fromEntries(data));
    }

    return (
        <fieldset>
            <legend>Login</legend>
            <form method="post" onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type="text" placeholder="username" name="username"/>
                </label>
                <label>
                    Password
                    <input type="password" placeholder="password" name="password"/>
                </label>
                {mutation.isPending ? "Connexion..." : <button>Login</button>}
            </form>
        </fieldset>
    );
}