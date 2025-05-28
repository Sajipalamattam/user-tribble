import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  ProfileDropdownHr
} from "./styledcomponents";

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

  useEffect(() => {
    if (!showAuthButtons) {
      setShowNavBar(true);
      setNavBarLocked(true);
      const timer = setTimeout(() => {
        setShowNavBar(false);
        setNavBarLocked(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showAuthButtons]);

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

  const handleLogout = () => navigate("/login");
  const handleNotification = () => alert("You have no new notifications!");

  return (
  <HeaderNavWrapper
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
    <PointerEventsBox>
      <StyledHeader>
        <Logo>MyCompany</Logo>
        <NavContainer>
          {showAuthButtons ? (
            <>
              <NavBtn
                active={isLogin}
                disabled={isLogin}
                onClick={() => navigate("/login")}
              >
                Login
              </NavBtn>
              <NavBtn
                active={isRegister}
                disabled={isRegister}
                onClick={() => navigate("/register")}
              >
                Register
              </NavBtn>
            </>
          ) : (
            <>
              <IconBtn
                title="Notifications"
                onClick={handleNotification}
              >
                <BellIcon />
              </IconBtn>
              <div style={{ position: "relative", display: "inline-block" }} ref={profileBtnRef}>
                <IconBtn
                  title="Profile"
                  onClick={() => setShowProfileDropdown((v) => !v)}
                >
                  <ProfileIcon />
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
              <NavBtn
                style={{
                  background: "#fff",
                  color: "#1976d2",
                  marginRight: 10,
                  marginLeft: 0,
                  padding: "6px 20px"
                }}
                onClick={handleLogout}
              >
                Logout
              </NavBtn>
            </>
          )}
        </NavContainer>
      </StyledHeader>
      {/* Nav Bar: visible for 2s after login, then only on header hover */}
      {!showAuthButtons && (
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
