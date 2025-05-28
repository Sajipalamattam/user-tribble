import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./users/Layout";
import Login from "./users/Login";
import Register from "./users/Register";
import EmployeeList from "./users";
import EmployeeDetails from "./users/EmployeeDetails";
import { EmployeeProvider } from "./users/EmployeeContext";
import './App.css';


function App() {
  return (
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
  );
}

export default App;
