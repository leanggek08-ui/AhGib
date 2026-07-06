import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { userService } from "../../services/userService";

export default function SuperAdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const changeRole = async (userId, newRole) => {
    try {
      await userService.updateUser(userId, { role_id: newRole });
      loadUsers(); // refresh
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <AdminLayout>
      <h1>Super Admin Panel</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" width="100%" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Change Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u.user_id}>
                <td>{u.user_id}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role_id}</td>

                <td>
                  <select
                    value={u.role_id}
                    onChange={(e) =>
                      changeRole(u.user_id, Number(e.target.value))
                    }
                  >
                    <option value={2}>Student</option>
                    <option value={1}>Admin</option>
                    <option value={3}>Super Admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </AdminLayout>
  );
}