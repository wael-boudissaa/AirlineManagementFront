
 import { createContext, useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
const AuthContext = createContext();

export default AuthContext;


export const UserContext=({children})=> {
  const [user,setUser]= useState(  {}
  );
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  
 
  const getUser = async (name) => {
  
  const response = await fetch("http://localhost:5001/sign/in", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email: name.email,
      password: name.password,
    }),
  });

  if (response.ok) {

    const responseData = await response.json();
    console.log(responseData)
    
    const token = responseData.token ; 
     localStorage.setItem('token' ,token )
     setUser(responseData.user)
     localStorage.setItem('username' ,responseData.user.first_name )

    navigate("/user")
    return ({msg: 'succes'})
  } else {
    navigate("/signin")
    console.log("Request failed. Status:", response.status);
    return ({msg : 'err'})
  }

  
};

let contextData = {
  getUser : getUser ,
}

return (
<AuthContext.Provider value ={contextData}>{children}</AuthContext.Provider>);}