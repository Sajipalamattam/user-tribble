import styled from 'styled-components';

export const HEADER_HEIGHT = 53;
export const MASTER_NAV_HEIGHT = HEADER_HEIGHT * 0.7;

export const HeaderNavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 200;
  pointer-events: none;
`;

export const PointerEventsBox = styled.div`
  pointer-events: auto;
`;

export const StyledHeader = styled.header`
  width: 100vw;
  background: ${({ theme }) =>
    theme.name === "Dark"
      ? "#121212"
      : (theme.colors.primary
          ? `linear-gradient(90deg, ${theme.colors.primary} 60%, ${theme.colors.button} 100%)`
          : 'linear-gradient(90deg, #1976d2 60%, #64b5f6 100%)')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px 0 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: ${({ theme }) =>
    theme.name === "Dark"
      ? "0 2px 16px rgba(0,0,0,0.7)"
      : "0 2px 16px rgba(25, 118, 210, 0.12)"};
  min-height: ${HEADER_HEIGHT}px;
  backdrop-filter: blur(6px);
  box-sizing: border-box;

  @media (max-width: 900px) {
    padding: 0 10px 0 10px !important;
    min-height: 44px !important;
  }
  @media (max-width: 600px) {
    padding: 0 2vw 0 2vw !important;
    min-height: 38px !important;
  }
`;


export const StyledNavBar = styled.div`
  width: 100vw;
  max-width: 100vw;
  height: ${MASTER_NAV_HEIGHT}px;
  background: ${({ theme }) =>
    theme.name === "Forest"
      ? "#d8f3dc"
      : theme.name === "Ocean"
        ? "#90caf9"
        : "linear-gradient(90deg, #54a0e5 60%, #90caf9 100%)"};
  position: fixed;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  right: 0;
  z-index: 99;
  overflow: visible;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 40px 0 60px;
  box-sizing: border-box;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.07);
  transition: height 0.4s cubic-bezier(.4,0,.2,1), opacity 0.4s cubic-bezier(.4,0,.2,1), transform 0.4s cubic-bezier(.4,0,.2,1);
  opacity: ${({ show }) => (show ? 1 : 0)};
  transform: ${({ show }) => (show ? 'translateY(0)' : 'translateY(-100%)')};
  pointer-events: ${({ show }) => (show ? 'auto' : 'none')};
`;





export const MasterBtnContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

export const MasterBtn = styled.button`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) =>
    theme.name === 'Ocean' || theme.name === 'Forest' ? '#fff' : theme.colors.primary};
  background: ${({ theme }) =>
    theme.name === 'Ocean'
      ? '#00A896'
      : theme.name === 'Forest'
        ? '#014421' // dark green
        : theme.colors.card};
  border: none;
  border-radius: 7px;
  padding: 5px 12px;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 0;
  z-index: 101;
  box-shadow: 0 2px 8px rgba(25,118,210,0.07);
  transition: background 0.2s, color 0.2s;

  @media (max-width: 900px) {
    padding: 7px 14px !important;
    font-size: 14px !important;
  }
  @media (max-width: 600px) {
    padding: 5px 8px !important;
    font-size: 12px !important;
  }
`;



export const DropdownBtn = styled.button`
  font-size: 15px;
  font-weight: 500;
  color: ${({ theme }) =>
    theme.name === 'Ocean' || theme.name === 'Forest' ? '#fff' : theme.colors.primary};
  background: none;
  border: none;
  text-align: left;
  padding: 10px 24px;
  cursor: pointer;
  border-radius: 0;
  outline: none;
  transition: background 0.2s;
`;



export const DropdownMenu = styled.div`
  display: ${({ show }) => (show ? 'flex' : 'none')};
  flex-direction: column;
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 120px;
  background: ${({ theme }) =>
    theme.name === 'Forest'
      ? '#014421' // dark green for Forest theme
      : theme.colors.card};
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.13);
  border-radius: 7px;
  padding: 7px 0;
  z-index: 102;
`;




export const Logo = styled.div`
  font-weight: 700;
  font-size: 21px;
  color: ${({ theme }) =>
    theme.name === "Light" || theme.name === "Dark" || theme.name === "Ocean" || theme.name === "Forest"
      ? "#fff"
      : (theme.colors.primary || "#1976d2")};
  letter-spacing: 1px;
  font-family: "Segoe UI", Arial, sans-serif;
  user-select: none;
  text-shadow: 0 1px 4px rgba(0,0,0,0.10);

  @media (max-width: 900px) {
    font-size: 16px !important;
  }
  @media (max-width: 600px) {
    font-size: 13px !important;
  }
`;





export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  gap: 8px;

  @media (max-width: 900px) {
    margin-right: 6px !important;
  }
  @media (max-width: 600px) {
    margin-right: 2px !important;
  }
`;

export const NavBtn = styled.button`
  font-size: 15px;
  font-weight: 600;
  color: ${({ active, theme }) =>
    active
      ? "#fff" // Active: white text
      : theme.colors.primary || "#90caf9"}; // Inactive: blue text
  background: ${({ active }) =>
    active
      ? "#181818" // Active: black background (or use "#000" if you want pure black)
      : "#fff"}; // Inactive: white background
  border: 2px solid ${({ theme }) => theme.colors.primary || "#90caf9"};
  border-radius: 7px;
  padding: 6px 20px;
  margin-left: 10px;
  cursor: ${({ active }) => (active ? "default" : "pointer")};
  pointer-events: ${({ active }) => (active ? "none" : "auto")};
  box-shadow: none;
  transition: background 0.2s, color 0.2s, border 0.2s;
  outline: none;
  font-family: inherit;

  &:hover {
    background: ${({ active, theme }) =>
      active
        ? "#181818"
        : theme.colors.primary || "#90caf9"};
    color: #fff;
    border-color: ${({ theme }) => theme.colors.primary || "#90caf9"};
  }
`;






export const IconBtn = styled.button`
  background: #fff;
  color: ${({ theme }) => theme.colors.primary || "#1976d2"};
  border: none;
  margin-left: 12px;
  margin-right: 0;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  outline: none;
  height: 28px;
  width: 28px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);

  &:hover {
    background: ${({ theme }) => theme.colors.primary || "#1976d2"};
    color: #fff;
  }

  svg {
    display: block;
    margin: auto;
    width: 22px;
    height: 22px;
  }
`;


export const ProfileDropdown = styled.div`
  position: fixed;
  top: ${HEADER_HEIGHT + 10}px;
  right: 30px;
  min-width: 220px;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
  z-index: 200;
  padding: 18px 0 8px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ProfileImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
`;

export const ProfileDropdownBtn = styled.button`
  background: none;
  border: none;
  color: ${({ danger, theme }) => (danger ? "#e53935" : theme.colors.primary)};
  font-weight: 500;
  font-size: 16px;
  padding: 7px 0;
  width: 100%;
  cursor: pointer;
  text-align: center;
`;

export const ProfileDropdownHr = styled.hr`
  width: 80%;
  margin: 12px 0 6px 0;
  border-color: #eee;
`;

export const PageBG = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 0;
  position: relative;
  overflow: hidden;
`;

export const Card = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: ${({ marginTop }) => marginTop || `${HEADER_HEIGHT + 40}px`} auto 0 auto;
  background: ${({ theme }) => theme.colors.card};
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(60,60,100,0.10);
  padding: 24px;
  position: relative;
  z-index: 1;

  @media (max-width: 1300px) {
    max-width: 98vw;
    padding: 16px 2vw;
  }
  @media (max-width: 900px) {
    max-width: 100vw;
    padding: 6px 0;
    border-radius: 0;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  flex-wrap: wrap;
`;

export const CardTitle = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  letter-spacing: 1px;

  @media (max-width: 900px) {
    font-size: 22px;
  }
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

export const SearchGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

export const SearchInput = styled.input`
  padding: 8px;
  font-size: 17px;
  width: 320px;
  border-radius: 8px;
  border: 1px solid #d0d7de;
  background: #f7fafc;
  margin-bottom: 4px;

  @media (max-width: 900px) {
    width: 180px;
    font-size: 15px;
  }
  @media (max-width: 600px) {
    width: 110px;
    font-size: 12px;
    padding: 8px 6px;
  }
`;

export const AddButton = styled.button`
  padding: 12px 24px;
  font-size: 17px;
  border-radius: 8px;
  background: ${({ theme }) =>
    theme.name === "Dark"
      ? "rgba(255,255,255,0.07)"
      : theme.colors.button};
  color: #fff;
  border: none;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(25,118,210,0.1);
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) =>
      theme.name === "Dark"
        ? "rgba(255,255,255,0.17)"
        : "#1251a6"};
  }

  @media (max-width: 900px) {
    font-size: 15px;
    padding: 10px 16px;
  }
  @media (max-width: 600px) {
    font-size: 12px;
    padding: 8px 8px;
  }
`;


export const Pagination = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

export const PageButton = styled.button`
  padding: 8px 24px;
  border-radius: 8px;
  background: ${({ disabled, theme }) =>
    disabled
      ? "#e0e0e0"
      : theme.name === "Dark"
        ? "#222"
        : theme.colors.button || "#1976d2"};
  color: ${({ disabled, theme }) =>
    disabled
      ? "#aaa"
      : "#fff"};
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  box-shadow: ${({ disabled }) =>
    disabled ? "none" : "0 4px 12px rgba(25, 118, 210, 0.18)"};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  transition: background 0.3s, transform 0.2s;
  margin: 0 4px;

  &:hover {
    background: ${({ disabled, theme }) =>
      disabled
        ? "#e0e0e0"
        : theme.name === "Dark"
          ? "#444"
          : "#1251a6"};
    transform: ${({ disabled }) => (disabled ? "none" : "scale(1.04)")};
  }
`;

export const PageNumber = styled.span`
  color: ${({ theme }) => theme.name === "Dark" ? "#fff" : "#222"};
  font-weight: 700;
  font-size: 18px;
  user-select: none;
  margin: 0 8px;
`;



export const BgImage = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  opacity: 0.15;
  filter: blur(1px);
  z-index: 0;
  pointer-events: none;
  user-select: none;
`;

export const LoginContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
`;

export const SplitScreen = styled.div`
  display: flex;
  width: 100%;
  max-width: 1100px;
  min-height: 600px;
  background: transparent;
  box-shadow: none;
  border-radius: 18px;
  overflow: hidden;
  margin: 60px auto 0 auto;

  @media (max-width: 900px) {
    flex-direction: column;
    max-width: 98vw;
    min-height: 0;
    margin: 60px auto 0 auto;
  }
`;

export const LeftSide = styled.div`
  flex: 1.7;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  min-width: 0;

  @media (max-width: 900px) {
    width: 100%;
    min-width: 0;
    max-width: 100vw;
    justify-content: center;
  }
`;

export const Illustration = styled.img`
  width: 100%;
  max-width: 820px;
  min-width: 400px;
  height: 500px;
  object-fit: contain;
  display: block;
  border: none;
  background: transparent;

  @media (max-width: 900px) {
    width: 98vw;
    max-width: 98vw;
    min-width: 0;
    height: 220px;
  }
`;

export const RightSide = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  min-width: 0;

  @media (max-width: 900px) {
    width: 100%;
    min-width: 0;
    max-width: 100vw;
    justify-content: center;
  }
`;

export const LoginCard = styled.form`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(60,60,100,0.10);
  padding: 48px 56px;
  max-width: 480px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  @media (max-width: 900px) {
    max-width: 98vw;
    padding: 36px 6vw;
  }
`;

export const LoginTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 24px;
  letter-spacing: 1px;
`;

export const LoginInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #d0d7de;
  background: #f7fafc;
  margin-bottom: 20px;
  outline: none;
  transition: border 0.2s;
  box-sizing: border-box;
`;

export const LoginButton = styled.button`
  width: 100%;
  padding: 12px 0;
  font-size: 18px;
  border-radius: 8px;
  background: ${({ theme }) =>
    theme.name === "Dark"
      ? "rgba(255,255,255,0.07)"
      : theme.colors.button};
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(25,118,210,0.1);
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) =>
      theme.name === "Dark"
        ? "rgba(255,255,255,0.17)"
        : "#1251a6"};
  }
`;



export const RegisterContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #e0e7ff 0%, #f8fafc 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const RegisterSplitScreen = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export const RegisterLeft = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
`;

export const RegisterRight = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
`;

export const RegisterCard = styled.form`
  background: ${({ theme }) => theme.colors.card};
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(60,60,100,0.10);
  padding: 40px 36px;
  max-width: 380px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RegisterTitle = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 24px;
  letter-spacing: 1px;
`;

export const RegisterInput = styled.input`
  width: 100%;
  padding: 12px 14px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #d0d7de;
  background: #f7fafc;
  margin-bottom: 20px;
  outline: none;
  transition: border 0.2s;
`;

export const RegisterButton = styled.button`
  width: 100%;
  padding: 12px 0;
  font-size: 18px;
  border-radius: 8px;
  background: ${({ theme }) =>
    theme.name === "Dark"
      ? "rgba(255,255,255,0.07)"
      : theme.colors.button};
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(25,118,210,0.1);
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) =>
      theme.name === "Dark"
        ? "rgba(255,255,255,0.17)"
        : "#1251a6"};
  }
`;


export const RegisterIllustration = styled.img`
  width: 75%;
  max-width: 480px;
  min-width: 240px;
  object-fit: contain;
`;

export const DetailsPageBG = styled.div`
  min-height: 100vh;
  position: relative;
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
`;

export const DetailsBgImage = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  opacity: 0.15;
  filter: blur(1px);
  z-index: 0;
  pointer-events: none;
  user-select: none;
`;

export const DetailsCard = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: ${({ marginTop }) => marginTop || '93px auto 0 auto'};
  background: ${({ theme }) => theme.colors.card};
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(60,60,100,0.10);
  padding: 24px;
  position: relative;
  z-index: 1;
`;

export const DetailsBtnRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

export const DetailsBtn = styled.button`
  padding: 8px 20px;
  border-radius: 6px;
  background: ${({ cancel, active, theme }) =>
    cancel ? '#e53935' : active ? theme.colors.button : '#e0e0e0'};
  color: ${({ cancel, active, theme }) =>
    cancel ? '#fff' : active ? theme.colors.buttonText : '#aaa'};
  border: none;
  font-size: 15px;
  cursor: ${({ active }) => (active ? 'pointer' : 'not-allowed')};
`;

export const DetailsTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 24px;
`;

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 20px;
  column-gap: 40px;
`;

export const DetailsFieldLabel = styled.div`
  font-weight: 500;
  color: #888;
`;

export const DetailsInput = styled.input`
  font-size: 17px;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #aaa;
  width: 90%;
`;

export const DetailsSelect = styled.select`
  font-size: 17px;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #aaa;
  width: 95%;
`;
