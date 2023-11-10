import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Badge, IconButton, Avatar } from "@material-tailwind/react";
import AuthContext from "../context/UserContext";

const ProfileNavBar = () => {
  const navigate = useNavigate(); 
  const {user} =useContext(AuthContext)
  const { authTokens, Logout } = useContext(AuthContext);
  return authTokens ? (
    <nav className="flex  flex-row items-center  rounded-xl my-5 px-5 bg-white">
      <Link className="text-2xl text-black font-semibold my-5">WAEL</Link>
      <ul className="flex w-full flex-row-reverse items-center z-10">
        <button
          className="mx-8 rounded-lg border p-4 bg-cyan-700 hover:text-blue-gray-500"
          onClick={() => {
            Logout();
          }}>
          Logout
        </button>
        <Link to={ `/${user.id}/account`} className="mx-8 hover:text-blue-gray-500">Account</Link>


        <Link to={ `/${user.id}/tickets`}  className="mx-8 hover:text-blue-gray-500">Tickets</Link>
        <Link to={ `/${user.id}`}  className="mx-8 hover:text-blue-gray-500">Home</Link>
      </ul>
    </nav>
  ) : (
    <nav className="flex w-full flex-row items-center bg-white rounded-xl my-5 px-5">
      <Link className="text-2xl text-black font-semibold my-5">WAEL</Link>
      <ul className="flex w-full flex-row-reverse items-center z-10">
        <button className="mx-8 rounded-lg border p-4 bg-cyan-700 hover:text-blue-gray-500">
          <Link to="/signup">Connect</Link>
        </button>
        <Link className="mx-8 hover:text-blue-gray-500">Home</Link>
      </ul>
    </nav>
  );
};

export default ProfileNavBar;
