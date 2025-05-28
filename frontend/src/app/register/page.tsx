"use client";

import { useState } from "react"

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [hint, setHint] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("Registering new user...💪");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/register`, {
                method: "POST",
                headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify({email, username, password, hint}),
            });

            const data = await res.json();
            if (res.ok) {
                setMessage("Successfully registered new user! 💪");
            } else {
                setMessage(`Error registering new user: ${data.message}`);
            }
    
        } catch (err) {
            setMessage(`MEGA error registering new user: ${err}`);
        }
    };

    return (
        <main className="min-h-screen flex flex-col justify center gap-4 p-4">
            <h1 className="text-2xl font-bold">
                Register
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
                <label>
                    Email:
                    <input 
                        type="email"
                        className="border p-2 rounded" 
                        value={email} 
                        placeholder="Email" 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input 
                        type="password" 
                        className="border p-2 rounded"
                        value={password} 
                        placeholder="Password" 
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Username:
                    <input 
                        type="username" 
                        className="border p-2 rounded"
                        value={username} 
                        placeholder="Username" 
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Hint (Optional):
                    <input 
                        type="hint" 
                        className="border p-2 rounded"
                        value={hint} 
                        placeholder="Hint" 
                        onChange={(e) => setHint(e.target.value)}
                    />
                </label>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Register
                </button>
            </form>
            {message && <p>{message}</p>}
        </main>
    );
}