import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { authorizationToken } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`Users`, data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log(`Users After Deletion ${data}`)
      if (response.ok) {
        getAllUsersData();
        toast.success("Deleted User");
      } else {
        toast.error("Error in Deleting User");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUsersData();
  }, [authorizationToken]);

  const filteredUsers = users.filter(user => user.email.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <section className='admin-user-section'>
        <div className='container'>
          <h1>User Data</h1>
          <input
            type="text"
            placeholder="Search by email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{width:"400px",height:"40px"}}
          />
        </div>
        <div className='container admin-users'>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((curUser, index) => {
                return <tr key={index}>
                  <td> {curUser.username} </td>
                  <td> {curUser.email} </td>
                  <td> {curUser.phone} </td>
                  <td><Link to={`/admin/users/${curUser._id}/edit`}>Edit</Link></td>
                  <td><button onClick={() => deleteUser(curUser._id)} style={{ backgroundColor: "#d9534f" }}>Delete</button></td>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default AdminUsers;
