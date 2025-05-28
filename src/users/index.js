import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from 'react-data-grid';
import 'react-data-grid/lib/styles.css';
import { useEmployees } from './EmployeeContext';
import {
  PageBG,
  Card,
  CardHeader,
  CardTitle,
  HeaderNavWrapper,
  PointerEventsBox,
  StyledHeader,
  StyledNavBar,
  SearchGroup,
  SearchInput,
  AddButton,
  Pagination,
  PageButton,
  BgImage,
  HEADER_HEIGHT
} from './styledcomponents';

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

  const clickableCellStyle = {
    cursor: 'pointer',
    color: '#222',
    fontWeight: 500
  };

  const columns = [
    { key: 'id', name: 'ID', flex: 0.5 },
    {
      key: 'fullName',
      name: 'Full Name',
      flex: 2,
      renderCell: ({ row }) => (
        <span
          style={{
            ...clickableCellStyle,
            fontWeight: 700,
            letterSpacing: '0.5px'
          }}
          onClick={() => navigate(`/employees/${encodeURIComponent(row.email)}`)}
        >
          {row.fullName}
        </span>
      )
    },
    {
      key: 'position',
      name: 'Position',
      flex: 1.5,
      renderCell: ({ row }) => (
        <span
          style={clickableCellStyle}
          onClick={() => navigate(`/employees/${encodeURIComponent(row.email)}`)}
        >
          {row.position}
        </span>
      )
    },
    {
      key: 'email',
      name: 'Email',
      flex: 2,
      renderCell: ({ row }) => (
        <span
          style={clickableCellStyle}
          onClick={() => navigate(`/employees/${encodeURIComponent(row.email)}`)}
        >
          {row.email}
        </span>
      )
    },
    {
      key: 'phone',
      name: 'Phone',
      flex: 1.5,
      renderCell: ({ row }) => (
        <span
          style={clickableCellStyle}
          onClick={() => navigate(`/employees/${encodeURIComponent(row.email)}`)}
        >
          {row.phone}
        </span>
      )
    },
    {
      key: 'gender',
      name: 'Gender',
      flex: 1,
      renderCell: ({ row }) => (
        <span
          style={clickableCellStyle}
          onClick={() => navigate(`/employees/${encodeURIComponent(row.email)}`)}
        >
          {row.gender}
        </span>
      )
    }
  ];

  return (
  <PageBG>
    <BgImage
      src={process.env.PUBLIC_URL + '/office-layout.jpeg'}
      alt=""
    />
    <Card>
      <CardHeader>
        <CardTitle>Employees</CardTitle>
        <SearchGroup>
          <SearchInput
            type="text"
            placeholder="Search employees..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <AddButton onClick={handleAddEmployee}>
            + Add Employee
          </AddButton>
        </SearchGroup>
      </CardHeader>
      <div style={{ width: '100%', overflowY: 'auto' }}>
        <DataGrid
          className="rdg-light"
          columns={columns}
          rows={pagedRows}
          rowHeight={ROW_HEIGHT}
          style={{ minWidth: 700 }}
        />
      </div>
      <Pagination>
        <PageButton
          onClick={() => setPage(prev => Math.max(prev - 1, 0))}
          disabled={page === 0}
        >
          Previous
        </PageButton>
        <span style={{ fontSize: 16 }}>
          Page <b>{totalPages === 0 ? 0 : page + 1}</b> of <b>{totalPages}</b>
        </span>
        <PageButton
          onClick={() => setPage(prev => Math.min(prev + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
        >
          Next
        </PageButton>
      </Pagination>
    </Card>
  </PageBG>
);

}
