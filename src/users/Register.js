import React, { useState } from 'react';
import Header from './Header'; // Import your persistent header component

const containerStyle = {
  minHeight: '100vh',
  width: '100vw',
  background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
};

const splitScreenStyle = {
  display: 'flex',
  width: '100vw',
  height: '100vh',
};

const leftStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
};

const rightStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
};

const illustrationStyle = {
  width: '75%',
  maxWidth: 480,
  minWidth: 240,
  objectFit: 'contain',
};

const cardStyle = {
  background: '#fff',
  borderRadius: 18,
  boxShadow: '0 8px 32px rgba(60,60,100,0.10)',
  padding: '40px 36px',
  maxWidth: 380,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const titleStyle = {
  fontSize: 28,
  fontWeight: 700,
  color: '#1976d2',
  marginBottom: 24,
  letterSpacing: 1,
};

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  fontSize: 16,
  borderRadius: 8,
  border: '1px solid #d0d7de',
  background: '#f7fafc',
  marginBottom: 20,
  outline: 'none',
  transition: 'border 0.2s',
};

const buttonStyle = {
  width: '100%',
  padding: '12px 0',
  fontSize: 18,
  borderRadius: 8,
  background: '#1976d2',
  color: '#fff',
  border: 'none',
  fontWeight: 600,
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(25,118,210,0.1)',
  transition: 'background 0.2s',
};

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
      // navigate('/employees'); // Uncomment if you want to redirect after registration
    }, 1000);
  };

  return (
    <div style={containerStyle}>
      <Header />
      <div style={splitScreenStyle}>
        {/* Left: Register Form */}
        <div style={leftStyle}>
          <form style={cardStyle} onSubmit={handleSubmit}>
            <div style={titleStyle}>Create Account</div>
            <input
              type="text"
              placeholder="Username"
              style={inputStyle}
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              style={inputStyle}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              style={inputStyle}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              style={buttonStyle}
              onMouseOver={e => (e.target.style.background = '#1251a6')}
              onMouseOut={e => (e.target.style.background = '#1976d2')}
            >
              Register
            </button>
            {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
            {success && <div style={{ color: 'green', marginTop: 10 }}>{success}</div>}
          </form>
        </div>
        {/* Right: Illustration */}
        <div style={rightStyle}>
          <img
            src={process.env.PUBLIC_URL + '/assets/login2img.png'} // Place your image in public/ and use this path
            alt="Register Illustration"
            style={illustrationStyle}
          />
        </div>
      </div>
    </div>
  );
}
