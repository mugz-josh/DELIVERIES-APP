// src/components/AdminPanel.tsx
import React, { useEffect, useState } from "react";
import "./AdminPanel.css";

interface User {
  id: number;
  name: string;
  email: string;
  role: "user" | "admin";
}

const API_BASE = "http://127.0.0.1:5000/api/otp";

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get JWT token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line
  }, []);

  // Fetch users from backend
  const loadUsers = async () => {
    if (!token) {
      setError("You must be logged in as admin to view users");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }

      const data: User[] = await response.json();

      if (!Array.isArray(data)) {
        throw new Error("Invalid response from server");
      }

      setUsers(data);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // Promote or demote user
  const updateRole = async (id: number, role: "user" | "admin") => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/users/${id}/role`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      setUsers(users.map(u => (u.id === id ? { ...u, role } : u)));
    } catch (err) {
      console.error(err);
      alert("Failed to update role. Check console for details.");
    }
  };

  // Delete user
  const removeUser = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE}/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      setUsers(users.filter(u => u.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete user. Check console for details.");
    }
  };

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (users.length === 0) return <p>No users found.</p>;

  return (
    <div className="admin-panel">
      <h2>Admin Panel - Manage Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className={u.role === "admin" ? "admin-row" : ""}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                {u.role === "user" && (
                  <button onClick={() => updateRole(u.id, "admin")}>Promote</button>
                )}
                {u.role === "admin" && (
                  <button onClick={() => updateRole(u.id, "user")}>Demote</button>
                )}
                <button onClick={() => removeUser(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
