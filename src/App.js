import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './users/Login';
import EmployeeList from './users';
import EmployeeDetails from './users/EmployeeDetails';
import { EmployeeProvider } from './users/EmployeeContext';

function App() {
  return (
    <EmployeeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/new" element={<EmployeeDetails mode="add" />} />
          <Route path="/employees/:employeeEmail" element={<EmployeeDetails />} />
        </Routes>
      </Router>
    </EmployeeProvider>
  );
}

export default App;
