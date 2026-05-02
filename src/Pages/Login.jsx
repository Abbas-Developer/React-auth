import React, { useState } from 'react';
import { supabase } from '../Supabase/supabaseClient';
import './Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e) {
        e.preventDefault();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            alert("Login Failed: " + error.message);
        } else {
            alert("Login Successful! Welcome " + data.user.email);
        }
    }

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form className="auth-form" onSubmit={handleLogin}>
                <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={email}
                    onChange={function(e) { setEmail(e.target.value) }}
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={function(e) { setPassword(e.target.value) }}
                    required 
                />
                <button type="submit" className="auth-button">Sign In</button>
            </form>
        </div>
    );
}

export default Login;