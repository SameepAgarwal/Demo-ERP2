import React, { useEffect, useState } from 'react';
import { BACKEND_LINK } from '../Importants';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { authenticate_user } from './authentication';
import { useUserData } from '../Reducers/userProvider';

const MAINDIV = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;

    .sign-in-form {
    max-width: 400px;
    width: 100%;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    label {
    display: block;
    margin-bottom: 10px;
    }

    input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 10px;
    }

    .show-password {
    cursor: pointer;
    font-size: 12px;
    color: #007bff;
    margin-left: 5px;
    }

    button {
    background-color: #007bff;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    }
`;

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { user_state, user_dispatch } = useUserData();


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle the form submission logic here
        // You can validate the inputs, make an API call, etc.
        try {
            const body = {
                email,
                password
            };

            if (!email || !password) {
                alert("Information Insufficient");
                return;
            }

            const result = await fetch(`${BACKEND_LINK}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(body)
            });

            const login_result = await result.json();
            if (login_result.message == "User Not Registered") {
                alert("User Not Registered");
                navigate('/signin');
            }
            else if (login_result.message == "Login Successful") {
                alert('Login Successful');
                user_dispatch({ type: 'LOGIN', payload: login_result.user });
                navigate('/admin');
            }
            else if (login_result.message == "Invalid Credentials") {
                alert('Invalid Credentials');
                return;
            }
        } catch (error) {
            console.log({ error: error });
        }
    };

    useEffect(() => {
        const check_user = async () => {
            const result = await authenticate_user();
            if (result.message == "User Authentication Successful") {
                alert("Login Successful");
                user_dispatch({ type: 'LOGIN', payload: result.user });
                if (location != "/admin") {
                    navigate('/admin');
                }
            }
        };
        check_user();
    }, []);

    return (
        <MAINDIV className="sign-in-container">
            <form onSubmit={handleSubmit} className="sign-in-form">
                <h2>Log In</h2>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete='on'
                    />
                </label>
                <label>
                    Password:
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span className="show-password" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Hide' : 'Show'} Password
                    </span>
                </label>
                <button type="submit">Log In</button>
            </form>
        </MAINDIV>
    );
};

export default LogIn;
