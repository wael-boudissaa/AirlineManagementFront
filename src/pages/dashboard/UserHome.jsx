import React, { useContext, useState } from "react";
import ProfileNavBar from "../../widgets/ProfileNavBar";
import CardHome from "../../widgets/Cards/CardHome";
import AuthContext from "../../context/UserContext";
import { Footer } from "../../widgets/Footer";
const UserHome = () => {
  const username = localStorage.getItem("username");
  return (
    <div className=" flex flex-col justify-between bg-cover bg-center  ">
      <div className="w-full bg-image h-screen">
        <div className="w-full h-3/4">
          <ProfileNavBar />
          <div className="flex flex-row items-center justify-between w-full h-full ">
            <div className="flex flex-col h-1/2 w-1/4 justify-center bg-white ml-3 rounded-3xl items-center ">
              <h1 className="font-medium text-3xl text-cyan-900 ">
                Welcome {username}
              </h1>
              <h1 className="font-medium text-base text-black">
                here you can find all the informations concerning your flight
              </h1>
            </div>
            <div className="flex flex-col h-3/4 w-1/4 justify-center bg-cyan-700 mr-10 rounded-l-3xl items-center">
            <h1 className="font-medium text-3xl text-white ">
                Your next flight gonna be 
              </h1>
              <h3>
                02/01/2002
              </h3>
              <h3>
                From Blida to Algiers
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl ml-5 my-7"> News</h1>
        <div className="flex flex-row items-center flex-wrap justify-between">
          <CardHome />
          <CardHome />
          <CardHome />
          <CardHome />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default UserHome;
