import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { logOut } from '../firebase';
const Navbar = () => {
  const { state, dispatch } = useAuth();

  const handleLogout = async () => {
    await logOut();
    alert("Want to Logout?")
    dispatch({ type: "LOGOUT" });
  };

  return (
    <nav className="navbar navbar-dark bg-dark" style={{ backgroundColor: '#4CAF50', padding: '10px', position: 'fixed', width: '100%',zIndex:"1" }}>
      <Link to="/" className="navbar-brand" style={{ color: '#fff' }}>Home</Link>
      {state.user ? (
        <>
          <span style={{color:"#3498db",fontSize:"26px",boxSizing:"border-box"}}>Welcome, {state.user.displayName}!</span>
          <Link to="/new-post" className="navbar-brand" style={{ color: '#fff' }}>Add Post</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <Link to="/signin">Want to add or delete the posts ? Sign In</Link>
      )}
    </nav>
  );
};

export default Navbar;
