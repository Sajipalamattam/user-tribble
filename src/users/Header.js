import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ProfileIcon = () => (
  <svg height="32" width="32" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" fill="#fff" />
    <ellipse cx="12" cy="17" rx="7" ry="4" fill="#fff" />
    <circle cx="12" cy="8" r="4" stroke="#1976d2" strokeWidth="2" />
    <ellipse cx="12" cy="17" rx="7" ry="4" stroke="#1976d2" strokeWidth="2" />
  </svg>
);

const BellIcon = () => (
  <svg width="30" height="30" fill="none" viewBox="0 0 24 24">
    <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11a6 6 0 1 0-12 0v5l-1.7 1.7a1 1 0 0 0 .7 1.7h14a1 1 0 0 0 .7-1.7L18 16z" fill="#1976d2"/>
  </svg>
);

const HEADER_HEIGHT = 53;
const MASTER_NAV_HEIGHT = HEADER_HEIGHT * 0.7;

const headerStyle = {
  width: "100vw",
  background: "linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 40px 0 60px",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  boxShadow: "0 2px 16px rgba(25, 118, 210, 0.12)",
  minHeight: HEADER_HEIGHT,
  backdropFilter: "blur(6px)",
  boxSizing: "border-box"
};

const navBarStyle = (show) => ({
  width: "100vw",
  maxWidth: "100vw",
  height: MASTER_NAV_HEIGHT,
  background: "linear-gradient(90deg, #90caf9 60%, #bbdefb 100%)",
  position: "fixed",
  top: HEADER_HEIGHT,
  left: 0,
  right: 0,
  zIndex: 99,
  overflow: "visible",
  transition:
    "height 0.4s cubic-bezier(.4,0,.2,1), opacity 0.4s cubic-bezier(.4,0,.2,1), transform 0.4s cubic-bezier(.4,0,.2,1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: show ? "0 40px 0 60px" : "0",
  boxSizing: "border-box",
  boxShadow: show ? "0 2px 8px rgba(25, 118, 210, 0.07)" : "none",
  opacity: show ? 1 : 0,
  transform: show ? "translateY(0)" : "translateY(-100%)",
  pointerEvents: show ? "auto" : "none"
});


const masterBtnStyle = {
  fontSize: 13,
  fontWeight: 600,
  color: "#1976d2",
  background: "#fff",
  border: "none",
  borderRadius: 7,
  padding: "5px 12px",
  cursor: "pointer",
  marginLeft: 10,
  marginRight: 0,
  position: "relative",
  zIndex: 101,
  boxShadow: "0 2px 8px rgba(25,118,210,0.07)",
  transition: "background 0.2s, color 0.2s"
};

const dropdownStyle = (show) => ({
  display: show ? "flex" : "none",
  flexDirection: "column",
  position: "absolute",
  top: "100%",
  left: 0,
  minWidth: 120,
  background: "#fff",
  boxShadow: "0 2px 8px rgba(25, 118, 210, 0.13)",
  borderRadius: 7,
  padding: "7px 0",
  zIndex: 102
});

const dropdownBtn = {
  fontSize: 15,
  fontWeight: 500,
  color: "#1976d2",
  background: "none",
  border: "none",
  textAlign: "left",
  padding: "10px 24px",
  cursor: "pointer",
  borderRadius: 0,
  outline: "none",
  transition: "background 0.2s"
};

const logoStyle = {
  fontWeight: 700,
  fontSize: 21,
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
  fontSize: 15,
  fontWeight: 600,
  color: active ? "#1976d2" : "#fff",
  background: active ? "#fff" : "rgba(25, 118, 210, 0.00)",
  border: "none",
  borderRadius: 7,
  padding: "6px 20px",
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
  height: 40,
  width: 40,
};

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNavBar, setShowNavBar] = useState(false);
  const [navBarLocked, setNavBarLocked] = useState(true);
  const [showMasterDropdown, setShowMasterDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const masterBtnRef = useRef(null);
  const profileBtnRef = useRef(null);

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";
  const showAuthButtons = isLogin || isRegister;

  // Show nav bar for 2s after login, then hide and unlock hover
  useEffect(() => {
    if (!showAuthButtons) {
      setShowNavBar(true);
      setNavBarLocked(true);
      const timer = setTimeout(() => {
        setShowNavBar(false);
        setNavBarLocked(false);
      }, 2000); // 2 seconds
      return () => clearTimeout(timer);
    }
  }, [showAuthButtons]);

  const handleNavBarMouseLeave = () => {
    if (!navBarLocked) {
      setShowNavBar(false);
      setShowMasterDropdown(false);
    }
  };

  // Profile dropdown close logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileBtnRef.current &&
        !profileBtnRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
    };
    if (showProfileDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileDropdown]);

  const handleLogout = () => navigate("/login");
  const handleNotification = () => alert("You have no new notifications!");

  return (
    <>
      <style>{`
        @media (max-width: 900px) {
          .custom-header {
            padding: 0 10px 0 10px !important;
            min-height: 44px !important;
          }
          .custom-logo {
            font-size: 16px !important;
          }
          .custom-nav {
            margin-right: 6px !important;
          }
          .master-btn {
            padding: 7px 14px !important;
            font-size: 14px !important;
          }
        }
        @media (max-width: 600px) {
          .custom-header {
            padding: 0 2vw 0 2vw !important;
            min-height: 38px !important;
          }
          .custom-logo {
            font-size: 13px !important;
          }
          .custom-nav {
            margin-right: 2px !important;
          }
          .master-btn {
            padding: 5px 8px !important;
            font-size: 12px !important;
          }
        }
      `}</style>
      <header
        className="custom-header"
        style={headerStyle}
        onMouseEnter={
          !showAuthButtons && !navBarLocked
            ? () => setShowNavBar(true)
            : undefined
        }
        onMouseLeave={
          !showAuthButtons && !navBarLocked
            ? handleNavBarMouseLeave
            : undefined
        }
      >
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
                style={iconBtnStyle}
                title="Notifications"
                onClick={handleNotification}
              >
                <BellIcon />
              </button>
              <div style={{ position: "relative", display: "inline-block" }} ref={profileBtnRef}>
                <button
                  style={iconBtnStyle}
                  title="Profile"
                  onClick={() => setShowProfileDropdown((v) => !v)}
                >
                  <ProfileIcon />
                </button>
                {showProfileDropdown && (
                  <div
                    style={{
                      position: "fixed",
                      top: HEADER_HEIGHT + 10,
                      right: 30,
                      minWidth: 220,
                      background: "#fff",
                      borderRadius: 12,
                      boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                      zIndex: 200,
                      padding: "18px 0 8px 0",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center"
                    }}
                  >
                    <img
                      src="https://i.pravatar.cc/80"
                      alt="Profile"
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        marginBottom: 10,
                        border: "2px solid #1976d2"
                      }}
                    />
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#1976d2",
                        fontWeight: 500,
                        fontSize: 16,
                        padding: "7px 0",
                        width: "100%",
                        cursor: "pointer",
                        textAlign: "center"
                      }}
                      onClick={() => {
                        setShowProfileDropdown(false);
                        // navigate("/profile/overview");
                      }}
                    >
                      Overview
                    </button>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#1976d2",
                        fontWeight: 500,
                        fontSize: 16,
                        padding: "7px 0",
                        width: "100%",
                        cursor: "pointer",
                        textAlign: "center"
                      }}
                      onClick={() => {
                        setShowProfileDropdown(false);
                        // navigate("/profile/account");
                      }}
                    >
                      Account
                    </button>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#1976d2",
                        fontWeight: 500,
                        fontSize: 16,
                        padding: "7px 0",
                        width: "100%",
                        cursor: "pointer",
                        textAlign: "center"
                      }}
                      onClick={() => {
                        setShowProfileDropdown(false);
                        // navigate("/help");
                      }}
                    >
                      Help
                    </button>
                    <hr style={{ width: "80%", margin: "12px 0 6px 0", borderColor: "#eee" }} />
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#e53935",
                        fontWeight: 500,
                        fontSize: 16,
                        padding: "7px 0",
                        width: "100%",
                        cursor: "pointer",
                        textAlign: "center"
                      }}
                      onClick={() => {
                        setShowProfileDropdown(false);
                        handleLogout();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              <button
                style={{
                  ...navBtnStyle(false),
                  background: "#fff",
                  color: "#1976d2",
                  marginRight: 10,
                  marginLeft: 0,
                  padding: "6px 20px"
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </header>
      {/* Nav Bar: visible for 2s after login, then only on hover */}
      {!showAuthButtons && (
        <div
          style={navBarStyle(showNavBar)}
          onMouseEnter={() => {
            if (!navBarLocked) setShowNavBar(true);
          }}
          onMouseLeave={handleNavBarMouseLeave}
        >
          <div
            style={{ position: "relative", display: "flex", alignItems: "center" }}
            onMouseEnter={() => setShowMasterDropdown(true)}
            onMouseLeave={() => setShowMasterDropdown(false)}
          >
            <button
              ref={masterBtnRef}
              className="master-btn"
              style={masterBtnStyle}
            >
              Master
            </button>
            {/* Dropdown below Master (shows on hover) */}
            <div style={dropdownStyle(showMasterDropdown)}>
  <button
    style={dropdownBtn}
    onClick={() => {
      setShowMasterDropdown(false);
      navigate("/roles");
    }}
  >
    Roles
  </button>
  <button
    style={dropdownBtn}
    onClick={() => {
      setShowMasterDropdown(false);
      navigate("/users");
    }}
  >
    User
  </button>
</div>

          </div>
        </div>
      )}
    </>
  );
}