import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BACKEND_LINK } from '../Importants';

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

const SignIn = () => {
    const [schoolName, setSchoolName] = useState('');
    const [schoolLogo, setSchoolLogo] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle the form submission logic here
        // You can validate the inputs, make an API call, etc.
        try {
            const body = {
                email,
                username,
                school_name: schoolName,
                school_logo_url: schoolLogo,
                password,
                confirm_password: confirmPassword
            };

            const result = await fetch(`${BACKEND_LINK}/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const singin_result = await result.json();
            console.log({ singin_result: singin_result });
            if (singin_result.message == "successful") {
                navigate('/');
                alert("Sign In Successful");
                console.log(singin_result.user_creation);
            }
            else if (singin_result.message == "User Already Registered") {
                navigate('/');
                alert("User Already Registered");
            }
        } catch (error) {
            console.log({ error: error });
        }
    };

    return (
        <MAINDIV className="sign-in-container">
            <form onSubmit={handleSubmit} className="sign-in-form">
                <h2>Sign In</h2>
                <label>
                    Email:
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete='on'
                    />
                </label>
                <label>
                    Username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    School Name:
                    <input
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    School Logo URL:
                    <input
                        type="text"
                        value={schoolLogo}
                        onChange={(e) => setSchoolLogo(e.target.value)}
                        required
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
                <label>
                    Confirm Password:
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Sign In</button>
            </form>
        </MAINDIV>
    );
};

export default SignIn;
