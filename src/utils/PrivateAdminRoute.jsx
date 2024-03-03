
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/UserContext'; // Adjust the import path as needed

const PrivateAdminRoute = ({ children }) => {
  const { user, Logout } = useContext(AuthContext)

  const handleLogout = () => {
    Logout();
    return <Navigate to="/signin" replace={true} />;
  };

  return user.type === 'admin' ? children : handleLogout();
};
 
export default PrivateAdminRoute;


  