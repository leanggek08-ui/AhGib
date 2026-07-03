import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { userService } from "../../services/userService";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;

    try {
      await userService.deleteUser(id);
      setUsers(users.filter((u) => u.user_id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const filtered = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <h1 style={{ fontSize: 24, fontWeight: 700 }}>Users</h1>

      <input
        placeholder="Search user..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: 10,
          marginTop: 20,
          marginBottom: 20,
          width: "300px",
        }}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table width="100%" border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((u) => (
              <tr key={u.user_id}>
                <td>{u.user_id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role_id}</td>
                <td>
                  <button
                    onClick={() => handleDelete(u.user_id)}
                    style={{ color: "red" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}