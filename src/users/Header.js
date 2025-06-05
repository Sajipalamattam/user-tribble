import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation,Link } from "react-router-dom";
import { useAuth } from "../users/AuthContext";
import {
  HEADER_HEIGHT,
  MASTER_NAV_HEIGHT,
  StyledHeader,
  StyledNavBar,
  MasterBtnContainer,
  MasterBtn,
  DropdownMenu,
  DropdownBtn,
  Logo,
  NavContainer,
  NavBtn,
  IconBtn,
  ProfileDropdown,
  ProfileImage,
  ProfileDropdownBtn,
  HeaderNavWrapper,
  PointerEventsBox,
  ProfileDropdownHr,
  HeaderContainer,
  LoginButton,
  RolesButton
} from "./styledcomponents";
import { useTheme } from "./ThemeContext";

// Sun, Moon, DownArrow SVGs (unchanged)
const SunIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#FFD600"/><g stroke="#FFD600" strokeWidth="2"><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/><line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/><line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/></g></svg>
);
const MoonIcon = () => (
  <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79z" fill="#333"/></svg>
);
const DownArrow = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5" stroke="#1976d2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

// Theme Dropdown Component (unchanged)
function ThemeDropdown() {
  const { themeName, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const themeOptions = [
    { name: "light", label: "Light", icon: <SunIcon /> },
    { name: "dark", label: "Dark", icon: <MoonIcon /> },
    { name: "ocean", label: "Ocean", icon: <span style={{display:'inline-block',width:16,height:16,background:'linear-gradient(135deg,#013A63,#05668D,#00A896,#DFF6F0)',borderRadius:4}} /> },
    { name: "forest", label: "Forest", icon: <span style={{display:'inline-block',width:16,height:16,background:'linear-gradient(135deg,#014421,#2d6a4f,#b7e4c7,#e6f4ea)',borderRadius:4}} /> }
  ];

  const currentTheme = themeOptions.find(opt => opt.name === themeName);

  // Close dropdown on outside click
  const dropdownRef = useRef();
  useEffect(() => {
    if (!open) return;
    const handler = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div style={{ position: "relative", marginLeft: 16 }} ref={dropdownRef}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          background: "#fff",
          border: "1px solid #eee",
          borderRadius: 8,
          padding: "6px 12px",
          cursor: "pointer",
          fontWeight: 500,
          fontSize: 15,
          minWidth: 60,
          gap: 6
        }}
        title="Change Theme"
      >
        {currentTheme.icon}
        <DownArrow />
      </button>
      {open && (
        <div style={{
          position: "absolute",
          top: "110%",
          right: 0,
          background: "#fff",
          borderRadius: 8,
          boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
          padding: 8,
          zIndex: 1000,
          minWidth: 140
        }}>
          {themeOptions.map(opt => (
            <div
              key={opt.name}
              onClick={() => { setTheme(opt.name); setOpen(false); }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 10px",
                borderRadius: 6,
                cursor: "pointer",
                background: themeName === opt.name ? "#e3f2fd" : "transparent",
                fontWeight: themeName === opt.name ? 700 : 500
              }}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ICONS WITH COLOR PROP
const BellIcon = ({ color = "#1976d2" }) => (
  <svg width="30" height="30" fill="none" viewBox="0 0 24 24">
    <path
      d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2zm6-6V11a6 6 0 1 0-12 0v5l-1.7 1.7a1 1 0 0 0 .7 1.7h14a1 1 0 0 0 .7-1.7L18 16z"
      fill={color}
    />
  </svg>
);

const ProfileIcon = ({ color = "#1976d2" }) => (
  <svg height="32" width="32" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4" fill="#fff" />
    <ellipse cx="12" cy="17" rx="7" ry="4" fill="#fff" />
    <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" />
    <ellipse cx="12" cy="17" rx="7" ry="4" stroke={color} strokeWidth="2" />
  </svg>
);

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNavBar, setShowNavBar] = useState(false);
  const [navBarLocked, setNavBarLocked] = useState(true);
  const [showMasterDropdown, setShowMasterDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const masterBtnRef = useRef(null);
  const profileBtnRef = useRef(null);

  // Use Auth Context!
  const { user, logout, isLoggedIn } = useAuth();

  const { theme } = useTheme();

  // ICON COLOR LOGIC
  let iconColor = "#1976d2";
  if (theme.name === "Dark") iconColor = "#000";
  if (theme.name === "Forest") iconColor = "#014421";

  useEffect(() => {
    if (isLoggedIn) {
      setShowNavBar(true);
      setNavBarLocked(true);
      const timer = setTimeout(() => {
        setShowNavBar(false);
        setNavBarLocked(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  const handleNavBarMouseLeave = () => {
    if (!navBarLocked) {
      setShowNavBar(false);
      setShowMasterDropdown(false);
    }
  };

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

  // Use context logout!
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleNotification = () => alert("You have no new notifications!");

  return (
    <HeaderNavWrapper
      onMouseEnter={
        isLoggedIn && !navBarLocked
          ? () => setShowNavBar(true)
          : undefined
      }
      onMouseLeave={
        isLoggedIn && !navBarLocked
          ? handleNavBarMouseLeave
          : undefined
      }
    >
      <PointerEventsBox>
        <StyledHeader>
          <Logo>MyCompany</Logo>
          <NavContainer>
            {isLoggedIn ? (
              <>
                <IconBtn
                  title="Notifications"
                  onClick={handleNotification}
                >
                  <BellIcon color={iconColor} />
                </IconBtn>
                <div style={{ position: "relative", display: "inline-block" }} ref={profileBtnRef}>
                  <IconBtn
                    title="Profile"
                    onClick={() => setShowProfileDropdown((v) => !v)}
                  >
                    <ProfileIcon color={iconColor} />
                  </IconBtn>
                  {showProfileDropdown && (
                    <ProfileDropdown>
                      <ProfileImage
                        src="https://i.pravatar.cc/80"
                        alt="Profile"
                      />
                      <ProfileDropdownBtn
                        onClick={() => {
                          setShowProfileDropdown(false);
                          // navigate("/profile/overview");
                        }}
                      >
                        Overview
                      </ProfileDropdownBtn>
                      <ProfileDropdownBtn
                        onClick={() => {
                          setShowProfileDropdown(false);
                          // navigate("/profile/account");
                        }}
                      >
                        Account
                      </ProfileDropdownBtn>
                      <ProfileDropdownBtn
                        onClick={() => {
                          setShowProfileDropdown(false);
                          // navigate("/help");
                        }}
                      >
                        Help
                      </ProfileDropdownBtn>
                      <ProfileDropdownHr />
                      <ProfileDropdownBtn
                        danger
                        onClick={() => {
                          setShowProfileDropdown(false);
                          handleLogout();
                        }}
                      >
                        Logout
                      </ProfileDropdownBtn>
                    </ProfileDropdown>
                  )}
                </div>
                <NavBtn onClick={handleLogout}>
                  Logout
                </NavBtn>
                <ThemeDropdown />
              </>
            ) : (
              <>
                <NavBtn onClick={() => navigate("/roles")}>
                  Roles
                </NavBtn>
                <NavBtn
                  active={location.pathname === "/login"}
                  disabled={location.pathname === "/login"}
                  onClick={() => navigate("/login")}
                >
                  Login
                </NavBtn>
                <NavBtn
                  active={location.pathname === "/register"}
                  disabled={location.pathname === "/register"}
                  onClick={() => navigate("/register")}
                >
                  Register
                </NavBtn>
                <ThemeDropdown />
              </>
            )}
          </NavContainer>
        </StyledHeader>
        {/* Nav Bar: visible for 2s after login, then only on header hover */}
        {isLoggedIn && (
          <StyledNavBar show={showNavBar}>
            <MasterBtnContainer
              onMouseEnter={() => setShowMasterDropdown(true)}
              onMouseLeave={() => setShowMasterDropdown(false)}
            >
              <MasterBtn
                ref={masterBtnRef}
                className="master-btn"
              >
                Master
              </MasterBtn>
              <DropdownMenu show={showMasterDropdown}>
                <DropdownBtn
                  onClick={() => {
                    setShowMasterDropdown(false);
                    navigate("/roles");
                  }}
                >
                  Roles
                </DropdownBtn>
                <DropdownBtn
                  onClick={() => {
                    setShowMasterDropdown(false);
                    navigate("/users");
                  }}
                >
                  User
                </DropdownBtn>
              </DropdownMenu>
            </MasterBtnContainer>
          </StyledNavBar>
        )}
      </PointerEventsBox>
    </HeaderNavWrapper>
  );
}
