import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();
    navigate('/employees');
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
          </LoginCard>
        </RightSide>
      </SplitScreen>
    </LoginContainer>
  );
}
