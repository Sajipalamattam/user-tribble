import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import './index.css';
import { useEmployees } from './EmployeeContext';

const pageStyle = {
  minHeight: '100vh',
  background: '#f6f8fa',
  padding: '40px 0',
  position: 'relative',
  overflow: 'hidden'
};

const cardStyle = {
  maxWidth: 1200,
  margin: '0 auto',
  background: '#fff',
  borderRadius: 18,
  boxShadow: '0 8px 32px rgba(60,60,100,0.10)',
  padding: 32,
  position: 'relative',
  zIndex: 1
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginBottom: 24
};

const titleStyle = {
  fontSize: 32,
  fontWeight: 700,
  color: '#1976d2',
  letterSpacing: 1
};

const searchGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: 10
};

const searchInputStyle = {
  padding: 10,
  fontSize: 17,
  width: 320,
  borderRadius: 8,
  border: '1px solid #d0d7de',
  background: '#f7fafc',
  marginBottom: 4
};

const addButtonStyle = {
  padding: '12px 24px',
  fontSize: '17px',
  borderRadius: '8px',
  background: '#1976d2',
  color: '#fff',
  border: 'none',
  fontWeight: 600,
  boxShadow: '0 2px 8px rgba(25,118,210,0.1)',
  cursor: 'pointer',
  transition: 'background 0.2s'
};

const paginationStyle = {
  marginTop: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 16
};

const PAGE_SIZE = 25;
const ROW_HEIGHT = 35;

export default function EmployeeList() {
  const { employees } = useEmployees();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const allRows = employees.map((emp, idx) => ({
    id: idx + 1,
    fullName: emp["Full name"],
    position: emp["Employee position"],
    email: emp.Email,
    phone: emp["Phone number"],
    gender: emp.Gender
  }));

  const filteredRows = allRows.filter(row =>
    Object.values(row)
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRows.length / PAGE_SIZE);
  const pagedRows = filteredRows.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  React.useEffect(() => {
    if (page > totalPages - 1) setPage(0);
  }, [search, totalPages, page]);

  const handleAddEmployee = () => {
    navigate('/employees/new');
  };

  const columns = [
    { key: 'id', name: 'ID', flex: 0.5 },
    {
      key: 'fullName',
      name: 'Full Name',
      flex: 2,
      renderCell: ({ row }) => (
        <span
          style={{ cursor: 'pointer', fontWeight: 500 }}
          onClick={() => navigate(`/employees/${encodeURIComponent(row.email)}`)}
        >
          {row.fullName}
        </span>
      )
    },
    { key: 'position', name: 'Position', flex: 1.5 },
    { key: 'email', name: 'Email', flex: 2 },
    { key: 'phone', name: 'Phone', flex: 1.5 },
    { key: 'gender', name: 'Gender', flex: 1 }
  ];

  return (
    <div style={pageStyle}>
      {}
      <img
        src="/office-layout.jpeg" 
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
      <div style={cardStyle}>
        <div style={headerStyle}>
          <div style={titleStyle}>Employee Directory</div>
          <div style={searchGroupStyle}>
            <input
              type="text"
              placeholder="Search employees..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={searchInputStyle}
            />
            <button
              onClick={handleAddEmployee}
              style={addButtonStyle}
              onMouseOver={e => (e.target.style.background = '#1251a6')}
              onMouseOut={e => (e.target.style.background = '#1976d2')}
            >
              + Add Employee
            </button>
          </div>
        </div>
        <DataGrid
          className="rdg-light"
          columns={columns}
          rows={pagedRows}
          rowHeight={ROW_HEIGHT}
        />
        <div style={paginationStyle}>
  <button
    onClick={() => setPage(prev => Math.max(prev - 1, 0))}
    disabled={page === 0}
    style={{
      padding: '8px 18px',
      borderRadius: 6,
      background: page === 0 ? '#e0e0e0' : '#1976d2',
      color: page === 0 ? '#aaa' : '#fff',
      border: 'none',
      fontWeight: 500,
      cursor: page === 0 ? 'default' : 'pointer'
    }}
  >
    Previous
  </button>
  <span style={{ fontSize: 16 }}>
    Page <b>{totalPages === 0 ? 0 : page + 1}</b> of <b>{totalPages}</b>
  </span>
  <button
    onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
    disabled={page >= totalPages - 1}
    style={{
      padding: '8px 18px',
      borderRadius: 6,
      background: page >= totalPages - 1 ? '#e0e0e0' : '#1976d2',
      color: page >= totalPages - 1 ? '#aaa' : '#fff',
      border: 'none',
      fontWeight: 500,
      cursor: page >= totalPages - 1 ? 'default' : 'pointer'
    }}
  >
    Next
  </button>
</div>
      </div>
    </div>
  );
}
