import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { signInWithGoogle } from '../firebase';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const { dispatch } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        setLoading(true);
        setError(null); // Reset error before attempting sign-in
        try {
            const user = await signInWithGoogle();
            console.log('user',user.user.displayName);
            setName(user);
            dispatch({ type: "LOGIN", payload: user.user });
            navigate("/");
        } catch (err) {
            setError('Failed to sign in. Please try again.');
            console.error("Sign-in error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ margin: '0 auto', maxWidth: '300px', textAlign: 'center', 'paddingTop': "100px" }}>
            <h2>Sign In</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleLogin} disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in with Google'}
            </button>
        </div>
    );
};

export default SignIn;
