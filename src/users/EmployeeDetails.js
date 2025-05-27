import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEmployees } from './EmployeeContext';

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
      <div style={{
        maxWidth: 700,
        margin: '90px auto 0 auto',
        padding: 32,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        position: 'relative',
        zIndex: 1
      }}>
        <h2 style={{ color: '#1976d2', marginBottom: 24 }}>Employee Not Found</h2>
        <button
          type="button"
          onClick={() => navigate('/employees')}
          style={{
            padding: '8px 20px',
            borderRadius: 6,
            background: '#1976d2',
            color: '#fff',
            border: 'none',
            fontSize: 15,
            cursor: 'pointer'
          }}
        >
          Back to List
        </button>
      </div>
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

  // Check if any field is modified (for update mode)
  const isModified = JSON.stringify(editForm) !== JSON.stringify(originalForm);

  // Enable Add button only if any field is filled (for add mode)
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
    <div style={{
      minHeight: '100vh',
      position: 'relative',
      background: '#f6f8fa',
      overflow: 'hidden'
    }}>
      <img
        src={process.env.PUBLIC_URL + 'details-page.jpeg'}//"/details-page.jpeg"  
        alt=""
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          opacity: 0.15,
          filter: 'blur(1px)',
          zIndex: 0,
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      />

      <div style={{
        maxWidth: 700,
        margin: '90px auto 0 auto',
        padding: 32,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
          <button
            type="button"
            className="details-btn"
            onClick={handleSave}
            disabled={isAddMode ? !isAnyFieldFilled : !isModified}
            style={{
              padding: '8px 20px',
              borderRadius: 6,
              background: (isAddMode ? isAnyFieldFilled : isModified) ? '#1976d2' : '#e0e0e0',
              color: (isAddMode ? isAnyFieldFilled : isModified) ? '#fff' : '#aaa',
              border: 'none',
              fontSize: 15,
              cursor: (isAddMode ? isAnyFieldFilled : isModified) ? 'pointer' : 'not-allowed'
            }}
          >
            {isAddMode ? 'Add' : 'Update'}
          </button>
          <button
            type="button"
            className="details-btn"
            onClick={handleCancel}
            style={{
              padding: '8px 20px',
              borderRadius: 6,
              background: '#e53935',
              color: '#fff',
              border: 'none',
              fontSize: 15,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>

        <h2 className="details-title" style={{ color: '#1976d2', marginBottom: 24 }}>
          {isAddMode ? 'Add New Employee' : 'Employee Details'}
        </h2>
        <div className="details-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          rowGap: 20,
          columnGap: 40
        }}>
          {fields.map((field, idx) => (
            <div key={idx}>
              <div style={{ fontWeight: 500, color: '#888' }}>{field.label}</div>
              {field.key === 'Employee position' ? (
                <select
                  value={editForm[field.key] || ''}
                  onChange={e => handleChange(field.key, e.target.value)}
                  style={{
                    fontSize: 17,
                    padding: 6,
                    borderRadius: 4,
                    border: '1px solid #aaa',
                    width: '95%'
                  }}
                  disabled={field.key === 'Email'}
                >
                  <option value="">Select Position</option>
                  {uniquePositions.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={editForm[field.key] || ''}
                  onChange={e => handleChange(field.key, e.target.value)}
                  style={{
                    fontSize: 17,
                    padding: 6,
                    borderRadius: 4,
                    border: '1px solid #aaa',
                    width: '90%'
                  }}
                  disabled={!isAddMode && field.key === 'Email'}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
