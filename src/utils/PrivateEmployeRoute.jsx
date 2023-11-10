import React, { useContext } from 'react'
import AuthContext from '../context/UserContext';
import { Navigate, useParams } from 'react-router-dom';

const PrivateEmployeRoute = ({ children }) => {
  const objectUser = useParams();
  
  const { user, Logout  } = useContext(AuthContext)

  const handleLogout = () => {
    Logout();

  };

  if ((user.type === 'employe' && user.id === objectUser.userid)) {
    return children;
  } else 
    handleLogout();
  
  return null;
};
export default PrivateEmployeRoute