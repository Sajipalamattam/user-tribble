import React, { createContext, useContext, useState } from 'react';
import employeesData from './employees.json';

const EmployeeContext = createContext();

export function EmployeeProvider({ children }) {
  const [employees, setEmployees] = useState(employeesData);

  //update
  const updateEmployee = (email, updatedFields) => {
    setEmployees(prev =>
      prev.map(emp =>
        emp.Email === email ? { ...emp, ...updatedFields } : emp
      )
    );
  };

  //add
  const addEmployee = (newEmployee) => {
    setEmployees(prev => [...prev, newEmployee]);
  };

  return (
    <EmployeeContext.Provider value={{ employees, updateEmployee, addEmployee }}>
      {children}
    </EmployeeContext.Provider>
  );
}
//to access employee context to any component
export function useEmployees() {
  return useContext(EmployeeContext);
}
