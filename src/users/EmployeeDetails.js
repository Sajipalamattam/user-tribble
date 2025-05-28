import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEmployees } from './EmployeeContext';
import {
  DetailsPageBG,
  DetailsBgImage,
  DetailsCard,
  DetailsBtnRow,
  DetailsBtn,
  DetailsTitle,
  DetailsGrid,
  DetailsFieldLabel,
  DetailsInput,
  DetailsSelect
} from './styledcomponents';

export default function EmployeeDetails({ mode }) {
  const { employeeEmail } = useParams();
  const navigate = useNavigate();
  const { employees, updateEmployee, addEmployee } = useEmployees();
  const isAddMode = mode === 'add';

  const uniquePositions = Array.from(
    new Set(employees.map(emp => emp["Employee position"]).filter(Boolean))
  );

  const employee = !isAddMode
    ? employees.find(emp => emp.Email === decodeURIComponent(employeeEmail))
    : null;

  const initialForm = isAddMode
    ? {
        "Full name": "",
        "Employee position": "",
        "Email": "",
        "Phone number": "",
        "Date of Birth": "",
        "Age": "",
        "Location": "",
        "Gender": "",
        "Nationality": ""
      }
    : employee
    ? { ...employee }
    : null;

  const [editForm, setEditForm] = useState(initialForm);
  const [originalForm, setOriginalForm] = useState(initialForm);

  useEffect(() => {
    if (!isAddMode) {
      setEditForm(employee ? { ...employee } : null);
      setOriginalForm(employee ? { ...employee } : null);
    } else {
      setEditForm(initialForm);
      setOriginalForm(initialForm);
    }
  }, [employeeEmail, employee, isAddMode]);

  if (!isAddMode && !employee) {
    return (
      <DetailsCard>
        <DetailsTitle>Employee Not Found</DetailsTitle>
        <DetailsBtn
          type="button"
          onClick={() => navigate('/employees')}
          active
        >
          Back to List
        </DetailsBtn>
      </DetailsCard>
    );
  }

  const fields = [
    { label: 'Full Name', key: 'Full name' },
    { label: 'Position', key: 'Employee position' },
    { label: 'Email', key: 'Email' },
    { label: 'Phone Number', key: 'Phone number' },
    { label: 'Date of Birth', key: 'Date of Birth' },
    { label: 'Age', key: 'Age' },
    { label: 'Location', key: 'Location' },
    { label: 'Gender', key: 'Gender' },
    { label: 'Nationality', key: 'Nationality' }
  ];

  const handleChange = (key, value) => {
    setEditForm(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const isModified = JSON.stringify(editForm) !== JSON.stringify(originalForm);
  const isAnyFieldFilled = isAddMode && Object.values(editForm).some(val => val && val.trim() !== "");

  const handleSave = () => {
    if (isAddMode) {
      if (
        !editForm["Full name"] ||
        !editForm["Email"] ||
        employees.some(emp => emp.Email === editForm["Email"])
      ) {
        alert("Please enter all required fields and ensure the email is unique.");
        return;
      }
      addEmployee(editForm);
      navigate('/employees');
    } else {
      updateEmployee(employee.Email, editForm);
      setOriginalForm({ ...editForm });
    }
  };

  const handleCancel = () => {
    navigate('/employees');
  };

  return (
    <DetailsPageBG>
      <DetailsBgImage
        src={process.env.PUBLIC_URL + 'details-page.jpeg'}
        alt=""
      />

      <DetailsCard>
        <DetailsBtnRow>
          <DetailsBtn
            type="button"
            onClick={handleSave}
            disabled={isAddMode ? !isAnyFieldFilled : !isModified}
            active={isAddMode ? isAnyFieldFilled : isModified}
          >
            {isAddMode ? 'Add' : 'Update'}
          </DetailsBtn>
          <DetailsBtn
            type="button"
            cancel
            onClick={handleCancel}
          >
            Cancel
          </DetailsBtn>
        </DetailsBtnRow>

        <DetailsTitle>
          {isAddMode ? 'Add New Employee' : 'Employee Details'}
        </DetailsTitle>
        <DetailsGrid>
          {fields.map((field, idx) => (
            <div key={idx}>
              <DetailsFieldLabel>{field.label}</DetailsFieldLabel>
              {field.key === 'Employee position' ? (
                <DetailsSelect
                  value={editForm[field.key] || ''}
                  onChange={e => handleChange(field.key, e.target.value)}
                  disabled={field.key === 'Email'}
                >
                  <option value="">Select Position</option>
                  {uniquePositions.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </DetailsSelect>
              ) : (
                <DetailsInput
                  type="text"
                  value={editForm[field.key] || ''}
                  onChange={e => handleChange(field.key, e.target.value)}
                  disabled={!isAddMode && field.key === 'Email'}
                />
              )}
            </div>
          ))}
        </DetailsGrid>
      </DetailsCard>
    </DetailsPageBG>
  );
}
