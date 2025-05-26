import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from './Header';

const containerStyle = {
  minHeight: '100vh',
  width: '100vw',
  background: 'linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
  boxSizing: 'border-box'
};

const splitScreenStyle = {
  display: 'flex',
  width: '100%',
  maxWidth: 1100,
  minHeight: 600,
  background: 'transparent',
  boxShadow: 'none',
  borderRadius: 18,
  overflow: 'hidden',
  margin: '60px auto 0 auto',
};

const leftStyle = {
  flex: 1.7, // Increased from 1.25 to make the left side larger
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  minWidth: 0,
};

const illustrationStyle = {
  width: '100%',
  maxWidth: 820,   // Increased from 600 to 820
  minWidth: 400,   // Increased from 320 to 400
  height: 500,     // Add a fixed height for a bigger image
  objectFit: 'contain',
  display: 'block',
  border: 'none',
  background: 'transparent'
};

const rightStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'transparent',
  minWidth: 0,
};

const cardStyle = {
  background: '#fff',
  borderRadius: 18,
  boxShadow: '0 8px 32px rgba(60,60,100,0.10)',
  padding: '48px 56px',
  maxWidth: 480,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxSizing: 'border-box'
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
  boxSizing: 'border-box'
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

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = e => {
    e.preventDefault();
    navigate('/employees');
  };

  return (
    <div style={containerStyle}>
      <style>{`
        @media (max-width: 900px) {
          .split-screen {
            flex-direction: column;
            max-width: 98vw !important;
            min-height: 0 !important;
            margin: 60px auto 0 auto !important;
          }
          .left-side, .right-side {
            width: 100% !important;
            min-width: 0 !important;
            max-width: 100vw !important;
            justify-content: center !important;
          }
          .login-card {
            max-width: 98vw !important;
            padding: 36px 6vw !important;
          }
          .login-illustration {
            width: 98vw !important;
            max-width: 98vw !important;
            min-width: 0 !important;
            height: 220px !important;
          }
        }
      `}</style>
      <Header />
      <div className="split-screen" style={splitScreenStyle}>
        {/* Left: Illustration */}
        <div className="left-side" style={leftStyle}>
          <img
            src={process.env.PUBLIC_URL + '/assets/loginfinal.png'}
            alt="Login Illustration"
            style={illustrationStyle}
            className="login-illustration"
            draggable="false"
          />
        </div>
        {/* Right: Login Card */}
        <div className="right-side" style={rightStyle}>
          <form className="login-card" style={cardStyle} onSubmit={handleLogin} autoComplete="off">
            <div style={titleStyle}>Login</div>
            <input
              type="text"
              placeholder="Name"
              style={inputStyle}
              value={name}
              onChange={e => setName(e.target.value)}
              required
              autoComplete="username"
            />
            <input
              type="password"
              placeholder="Password"
              style={inputStyle}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <button
              type="submit"
              style={buttonStyle}
              onMouseOver={e => (e.target.style.background = '#1251a6')}
              onMouseOut={e => (e.target.style.background = '#1976d2')}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
