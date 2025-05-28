import React, { useState } from 'react';
import Header from './Header';
import {
  RegisterContainer,
  RegisterSplitScreen,
  RegisterLeft,
  RegisterRight,
  RegisterCard,
  RegisterTitle,
  RegisterInput,
  RegisterButton,
  RegisterIllustration
} from './styledcomponents';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!username.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required!');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address!');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters!');
      return;
    }

    setSuccess('Registration successful!');
    setUsername('');
    setEmail('');
    setPassword('');

    setTimeout(() => {
      setSuccess('');
    }, 1000);
  };

  return (
    <RegisterContainer>
      <Header />
      <RegisterSplitScreen>
        {/* Left: Register Form */}
        <RegisterLeft>
          <RegisterCard onSubmit={handleSubmit}>
            <RegisterTitle>Create Account</RegisterTitle>
            <RegisterInput
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <RegisterInput
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <RegisterInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <RegisterButton type="submit">
              Register
            </RegisterButton>
            {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
            {success && <div style={{ color: 'green', marginTop: 10 }}>{success}</div>}
          </RegisterCard>
        </RegisterLeft>
        {/* Right: Illustration */}
        <RegisterRight>
          <RegisterIllustration
            src={process.env.PUBLIC_URL + '/assets/login2img.png'}
            alt="Register Illustration"
          />
        </RegisterRight>
      </RegisterSplitScreen>
    </RegisterContainer>
  );
}
