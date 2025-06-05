import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./users/Layout";
import Login from "./users/Login";
import Register from "./users/Register";
import EmployeeList from "./users";
import EmployeeDetails from "./users/EmployeeDetails";
import { EmployeeProvider } from "./users/EmployeeContext";
import { ThemeProvider, useTheme } from "./users/ThemeContext";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import ProtectedRoute from "./ProtectedRoute";
import './App.css';
import Roles from "./users/Roles";
import RoleDetails from "./users/Roledetails";
import { AuthProvider } from "./users/AuthContext"; // <-- Import AuthProvider

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
              <Route path="/roles" element={<Roles />} />
              <Route path="/roles/:roleId" element={<RoleDetails />} />
              
              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employees/new" element={<EmployeeDetails mode="add" />} />
                <Route path="/employees/:employeeEmail" element={<EmployeeDetails />} />
              </Route>
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
      <AuthProvider>
        <AppWithStyledTheme />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
