import React, { useContext } from 'react'
import AuthContext from '../context/UserContext';
import { Navigate, useParams } from 'react-router-dom';

const PrivateEmployeRoute = ({ children }) => {
  const objectUser = useParams();
  
  const { user, Logout } = useContext(AuthContext)

  const handleLogout = () => {
    Logout();
    console.log(objectUser)
    return <Navigate to="/signin" replace={true} />;
  };

  return user.type === 'employe' && user.id === objectUser.userid ? children : handleLogout();
};
export default PrivateEmployeRoute