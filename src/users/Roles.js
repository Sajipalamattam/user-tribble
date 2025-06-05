import React, { useState, useEffect } from "react";
import { DataGrid } from "react-data-grid";
import "react-data-grid/lib/styles.css";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  AddButton,
  DataGridWrapper,
  RoleClickable,
  DeleteButton,
  SaveButton,
  CancelButton,
  RoleEditBox,
  EditInput,
  SearchInput
} from "./styledcomponents";

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [search, setSearch] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);

  // For viewing/updating a role
  const [selectedRole, setSelectedRole] = useState(null);
  const [editName, setEditName] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('user');

  // Fetch all roles initially
  useEffect(() => {
    fetch("http://localhost:8080/api/roles", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => setRoles(data))
      .catch(err => console.error("Failed to fetch roles:", err));
  }, []);

  // Live search effect (debounced)
  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      if (!search.trim()) {
        fetch("http://localhost:8080/api/roles", {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        })
          .then(res => res.json())
          .then(data => setRoles(data))
          .catch(err => alert("Error: " + err.message));
      } else {
        fetch("http://localhost:8080/api/role/search", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: search })
        })
          .then(res => {
            if (!res.ok) throw new Error("Failed to search roles");
            return res.json();
          })
          .then(data => setRoles(data))
          .catch(err => alert("Error: " + err.message));
      }
    }, 300);

    setDebounceTimer(timer);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [search]);

  // Columns for DataGrid
  const columns = [
    { key: "id", name: "ID", width: 80 },
    {
      key: "name",
      name: "Role Name",
      flex: 1,
      renderCell: ({ row }) =>
        isLoggedIn ? (
          <RoleClickable onClick={() => navigate(`/roles/${row.id}`)}>
            {row.name}
          </RoleClickable>
        ) : (
          <span>{row.name}</span>
        )
    },
    ...(isLoggedIn
      ? [
          {
            key: "actions",
            name: "Actions",
            width: 120,
            renderCell: ({ row }) => (
              <DeleteButton onClick={() => handleDeleteRole(row.id)}>
                Delete
              </DeleteButton>
            )
          }
        ]
      : [])
  ];

  // Add role
  const handleAddRole = () => {
    if (newRole.trim()) {
      fetch("http://localhost:8080/api/roles/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newRole })
      })
        .then(res => {
          if (!res.ok) throw new Error("Failed to add role");
          return res.json();
        })
        .then(addedRole => {
          setRoles([...roles, addedRole]);
          setNewRole("");
          setShowAdd(false);
        })
        .catch(err => alert("Error: " + err.message));
    }
  };

  // Delete role
  const handleDeleteRole = (roleId) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;
    fetch("http://localhost:8080/api/roles/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: roleId })
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to delete role");
        setRoles(roles.filter(role => role.id !== roleId));
      })
      .catch(err => alert("Error: " + err.message));
  };

  // View role details for update
  const handleSelectRole = (roleId) => {
    fetch("http://localhost:8080/api/roles/select", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: roleId })
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch role details");
        return res.json();
      })
      .then(role => {
        setSelectedRole(role);
        setEditName(role.name);
      })
      .catch(err => alert("Error: " + err.message));
  };

  // Update role
  const handleUpdateRole = () => {
    fetch("http://localhost:8080/api/role/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: selectedRole.id, name: editName })
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to update role");
        return res.json();
      })
      .then(updatedRole => {
        setRoles(roles.map(r => (r.id === updatedRole.id ? updatedRole : r)));
        setSelectedRole(null);
        setEditName("");
      })
      .catch(err => alert("Error: " + err.message));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Roles</CardTitle>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <SearchInput
            type="text"
            placeholder="Search roles..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <AddButton onClick={() => setShowAdd(true)}>+ Add Role</AddButton>
        </div>
      </CardHeader>
      {showAdd && (
        <div style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
          <EditInput
            type="text"
            placeholder="Role name"
            value={newRole}
            onChange={e => setNewRole(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <AddButton onClick={handleAddRole}>Add</AddButton>
          <AddButton onClick={() => setShowAdd(false)} style={{ background: "#e53935" }}>Cancel</AddButton>
        </div>
      )}
      <DataGridWrapper>
        <DataGrid
          className="rdg-light"
          columns={columns}
          rows={roles}
          rowHeight={35}
          style={{ minWidth: 400 }}
        />
      </DataGridWrapper>
      {/* Role details and update form */}
      {selectedRole && (
        <RoleEditBox>
          <h3>Edit Role</h3>
          <div style={{ marginBottom: 8 }}>
            <label>ID: </label>
            <span>{selectedRole.id}</span>
          </div>
          <div style={{ marginBottom: 8 }}>
            <label>Name: </label>
            <EditInput
              type="text"
              value={editName}
              onChange={e => setEditName(e.target.value)}
            />
          </div>
          <SaveButton onClick={handleUpdateRole}>Save</SaveButton>
          <CancelButton onClick={() => setSelectedRole(null)}>Cancel</CancelButton>
        </RoleEditBox>
      )}
    </Card>
  );
}
