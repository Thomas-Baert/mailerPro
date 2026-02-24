import type { FormEvent } from 'react';
import axios from 'axios';
import {useMutation} from "@tanstack/react-query";

export default function Register() {
    const mutation = useMutation<any, any, Record<string, any>>({
        mutationFn: (formData) => axios.post('/api/register', formData),
        onSuccess: (data) => console.log('Register successful:', data),
        onError: (err) => console.log('Register error:', err)
    });

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        mutation.mutate(Object.fromEntries(data));
    }

    return (
        <fieldset>
            <legend>Register</legend>
            <form method="post" onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" name="username" placeholder="username" required />
                <label>Email</label>
                <input type="email" name="email" placeholder="email" required />
                <label>Firstname</label>
                <input type="text" name="firstname" placeholder="firstname" required />
                <label>Surname</label>
                <input type="text" name="surname" placeholder="surname" required />
                <label>Birthdate</label>
                <input type="date" name="birthdate" placeholder="birthdate" required />
                <label>Address</label>
                <input type="text" name="address" placeholder="address" required />
                <label>Phone number</label>
                <input type="text" name="phoneNumber" placeholder="phone number" required />
                <label>Password</label>
                <input type="password" name="password" placeholder="password" required />
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="" required />
            </form>
        </fieldset>
    )
}