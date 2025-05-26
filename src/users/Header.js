import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Simple profile icon SVG
const ProfileIcon = () => (
  <svg height="28" width="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" fill="#fff" />
    <ellipse cx="12" cy="17" rx="7" ry="4" fill="#fff" />
    <circle cx="12" cy="8" r="4" stroke="#1976d2" strokeWidth="2" />
    <ellipse cx="12" cy="17" rx="7" ry="4" stroke="#1976d2" strokeWidth="2" />
  </svg>
);

// Simple bell SVG for notifications
const BellIcon = () => (
  <svg width="26" height="26" fill="none" viewBox="0 0 24 24">
    <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11a6 6 0 1 0-12 0v5l-1.7 1.7a1 1 0 0 0 .7 1.7h14a1 1 0 0 0 .7-1.7L18 16z" fill="#1976d2"/>
  </svg>
);

const headerStyle = {
  width: "100%",
  background: "linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 40px 0 60px",
  position: "absolute",
  top: 0,
  left: 0,
  zIndex: 100,
  boxShadow: "0 2px 16px rgba(25, 118, 210, 0.12)",
  minHeight: 48,
  borderBottomLeftRadius: 18,
  borderBottomRightRadius: 18,
  backdropFilter: "blur(6px)",
  boxSizing: "border-box"
};

const logoStyle = {
  fontWeight: 700,
  fontSize: 19,
  color: "#fff",
  letterSpacing: 1,
  fontFamily: "Segoe UI, Arial, sans-serif",
  userSelect: "none",
  textShadow: "0 2px 8px rgba(25,118,210,0.12)",
};

const navContainer = {
  display: "flex",
  alignItems: "center",
  marginRight: 20,
  gap: 8
};

const navBtnStyle = (active) => ({
  fontSize: 14,
  fontWeight: 600,
  color: active ? "#1976d2" : "#fff",
  background: active ? "#fff" : "rgba(25, 118, 210, 0.00)",
  border: "none",
  borderRadius: 7,
  padding: "5px 18px",
  marginLeft: 10,
  cursor: active ? "default" : "pointer",
  pointerEvents: active ? "none" : "auto",
  boxShadow: active ? "0 2px 8px rgba(25,118,210,0.07)" : "none",
  transition: "background 0.2s, color 0.2s",
  outline: "none",
  fontFamily: "inherit",
});

const iconBtnStyle = {
  background: "none",
  border: "none",
  marginLeft: 12,
  marginRight: 0,
  padding: 0,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  borderRadius: 50,
  outline: "none",
  height: 36,
  width: 36,
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  const showAuthButtons = isLogin || isRegister;

  const handleLogout = () => {
    navigate("/login");
  };

  const handleDepartment = () => {
    navigate("/departments");
  };

  const handleNotification = () => {
    alert("You have no new notifications!"); // Replace with your notification logic
  };

  return (
    <>
      <style>{`
        @media (max-width: 600px) {
          .custom-header {
            padding: 0 8px 0 8px !important;
            min-height: 38px !important;
          }
          .custom-logo {
            font-size: 15px !important;
          }
          .custom-nav {
            margin-right: 6px !important;
          }
          .custom-nav button {
            font-size: 12px !important;
            padding: 4px 10px !important;
          }
        }
      `}</style>
      <header className="custom-header" style={headerStyle}>
        <div className="custom-logo" style={logoStyle}>
          MyCompany
        </div>
        <div className="custom-nav" style={navContainer}>
          {showAuthButtons ? (
            <>
              <button
                style={navBtnStyle(isLogin)}
                disabled={isLogin}
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                style={navBtnStyle(isRegister)}
                disabled={isRegister}
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </>
          ) : (
            <>
              <button
                style={navBtnStyle(false)}
                onClick={handleDepartment}
              >
                Department
              </button>
              <button
                style={iconBtnStyle}
                title="Notifications"
                onClick={handleNotification}
              >
                <BellIcon />
              </button>
              <button style={iconBtnStyle} title="Profile">
                <ProfileIcon />
              </button>
              <button
                style={{
                  ...navBtnStyle(false),
                  background: "#fff",
                  color: "#1976d2",
                  marginRight: 10,
                  marginLeft: 0,
                  padding: "5px 18px"
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>
    </>
  );
}
