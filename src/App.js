import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./users/Layout";
import Login from "./users/Login";
import Register from "./users/Register";
import EmployeeList from "./users";
import EmployeeDetails from "./users/EmployeeDetails";
import { EmployeeProvider } from "./users/EmployeeContext";
import { ThemeProvider, useTheme } from "./users/ThemeContext"; // <-- import both
import { ThemeProvider as StyledThemeProvider } from "styled-components"; // <-- styled-components provider
import './App.css';

// A wrapper component to access the theme from context and provide it to styled-components
function AppWithStyledTheme() {
  const { theme } = useTheme();
  return (
    <StyledThemeProvider theme={theme}>
      <EmployeeProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/employees" element={<EmployeeList />} />
              <Route path="/employees/new" element={<EmployeeDetails mode="add" />} />
              <Route path="/employees/:employeeEmail" element={<EmployeeDetails />} />
            </Routes>
          </Layout>
        </Router>
      </EmployeeProvider>
    </StyledThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppWithStyledTheme />
    </ThemeProvider>
  );
}

export default App;
