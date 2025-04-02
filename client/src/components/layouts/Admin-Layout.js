import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FaMessage } from 'react-icons/fa6';
import { FaUmbrellaBeach } from 'react-icons/fa';
import { FaHome } from 'react-icons/fa';
import { useAuth } from '../../store/auth';
import Loading from '../../pages/Loading';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';

const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  console.log("Admin Layout", user);

  if (isLoading) {
    return <Loading />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar style={{backgroundColor:"transparent"}} expand="lg">
        <div className="container">
          <Navbar.Brand href="/" style={{color:"white"}}>AdminDash</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" style={{paddingLeft:"330px",justifyContent:"space-between"}}>
              <Nav.Link as={NavLink} to="/admin/users" style={{color:"white", marginRight: "15px"}}><FaUser /> Users</Nav.Link>
              <Nav.Link as={NavLink} to="/admin/contacts" style={{color:"white", marginRight: "15px"}}><FaMessage /> Contacts</Nav.Link>
              <Nav.Link as={NavLink} to="/admin/city" style={{color:"white", marginRight: "15px"}}><FaMessage /> City</Nav.Link>
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} style={{color:"white"}}><FaUmbrellaBeach /> Places</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item as={NavLink} to="/admin/places/add">Add Place</Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/admin/places/delete">Delete Place</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Nav.Link as={NavLink} to="/" style={{color:"white", marginRight: "10px"}}><FaHome /> Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <Outlet />
    </>
  );
};

export default AdminLayout;
