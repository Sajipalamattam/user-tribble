import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  DetailsPageBG,
  DetailsCard,
  DetailsTitle,
  DetailsBtnRow,
  DetailsBtn,
  DetailsFieldLabel,
  DetailsInput
} from "./styledcomponents";

export default function RoleDetails() {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/roles/select", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: roleId })
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch role details");
        return res.json();
      })
      .then(data => {
        setRole(data);
        setEditName(data.name);
        setLoading(false);
      })
      .catch(err => {
        alert("Error: " + err.message);
        setLoading(false);
      });
  }, [roleId]);

  const handleUpdate = () => {
    fetch("http://localhost:8080/api/role/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: role.id, name: editName })
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to update role");
        return res.json();
      })
      .then(updatedRole => {
        setRole(updatedRole);
        alert("Role updated successfully!");
      })
      .catch(err => alert("Error: " + err.message));
  };

  if (loading) return <DetailsPageBG><DetailsCard><div>Loading...</div></DetailsCard></DetailsPageBG>;
  if (!role) return <DetailsPageBG><DetailsCard><div>Role not found.</div></DetailsCard></DetailsPageBG>;

  return (
    <DetailsPageBG>
      <DetailsCard>
        <DetailsTitle>Role Details</DetailsTitle>
        <div style={{ marginBottom: 24 }}>
          <DetailsFieldLabel>ID</DetailsFieldLabel>
          <div style={{ marginBottom: 16 }}>{role.id}</div>
          <DetailsFieldLabel>Name</DetailsFieldLabel>
          <DetailsInput
            type="text"
            value={editName}
            onChange={e => setEditName(e.target.value)}
            style={{ marginBottom: 16, width: "40%" }}
          />
        </div>
        <DetailsBtnRow>
          <DetailsBtn
            active={!!editName.trim()}
            onClick={handleUpdate}
            style={{ marginRight: 12 }}
          >
            Update
          </DetailsBtn>
          <DetailsBtn cancel onClick={() => navigate(-1)}>
            Cancel
          </DetailsBtn>
        </DetailsBtnRow>
      </DetailsCard>
    </DetailsPageBG>
  );
}
