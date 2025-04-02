import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import {toast} from 'react-toastify';

const AdminContacts = () => {
  const { authorizationToken } = useAuth();
  const [contactData, setContactData] = useState([]);

  const getContactsData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      console.log("Contact data", data);
      if (response.ok) {
        setContactData(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteContactById=async(id)=>{
      try {
        const response=await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`,{
          method:'DELETE',
          headers:{
            Authorization:authorizationToken,
          }
        });
        if(response.ok){
          getContactsData();
          toast.success("Deleted Successfully");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error in Deleting");
      }
  }

  useEffect(() => {
    getContactsData();
  }, []);

  return (
    <div style={styles.container}>
      {contactData.map((curContactData, index) => {
        const { username, email, message, _id } = curContactData;
        return (
          <div key={index} style={styles.contactItem}>
            <p style={styles.username}>{username}</p>
            <p style={styles.email}>{email}</p>
            <p style={styles.message}>{message}</p>
            <button style={styles.deleteBtn} onClick={()=>deleteContactById(_id)}>DELETE</button> 
          </div>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  contactItem: {
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '10px',
  },
  username: {
    fontWeight: 'bold',
  },
  deleteBtn: {
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default AdminContacts;
