import * as React from "react";

export default function Login() {
    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        const username = data.get("username");
        const password = data.get("password");
        console.log("Username:", username);
        console.log("Password:", password);
    }

    return (
        <form method="post" onSubmit={handleSubmit}>
            <label>
                Username
                <input type="text" placeholder="username" />
            </label>
            <label>
                Password
                <input type="password" placeholder="Password" />
            </label>
            <button>Login</button>
        </form>
    );
}