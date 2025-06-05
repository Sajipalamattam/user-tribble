import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../users/AuthContext"; // <-- Import useAuth!
import Header from './Header';
import {
  LoginContainer,
  SplitScreen,
  LeftSide,
  Illustration,
  RightSide,
  LoginCard,
  LoginTitle,
  LoginInput,
  LoginButton
} from './styledcomponents';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // <-- Use Auth Context

  const handleLogin = async e => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !password.trim()) {
      setError('Both fields are required!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, password })
      });
      const data = await response.json();

      if (response.ok && data.accessToken) {
        // Save JWT token for future authenticated requests
        localStorage.setItem('token', data.accessToken);
        // Use Auth Context to set user and update header everywhere
        login({
          id: data.id,
          username: data.username,
          email: data.email,
          roles: data.roles
        });
        navigate('/employees');
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <LoginContainer>
      <Header />
      <SplitScreen>
        {/* Left: Illustration */}
        <LeftSide>
          <Illustration
            src={process.env.PUBLIC_URL + '/assets/loginfinal.png'}
            alt="Login Illustration"
            draggable="false"
          />
        </LeftSide>
        {/* Right: Login Card */}
        <RightSide>
          <LoginCard onSubmit={handleLogin} autoComplete="off">
            <LoginTitle>Login</LoginTitle>
            <LoginInput
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              autoComplete="username"
            />
            <LoginInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <LoginButton type="submit">
              Login
            </LoginButton>
            {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
          </LoginCard>
        </RightSide>
      </SplitScreen>
    </LoginContainer>
  );
}
