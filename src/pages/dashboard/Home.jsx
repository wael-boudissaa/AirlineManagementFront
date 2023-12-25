import React, { useState } from "react";
import ProfileNavBar from "../../widgets/ProfileNavBar";
import CardHome from "../../widgets/Cards/CardHome";
import { Footer } from "../../widgets/Footer";
  const Home = () => {

  return (
    <div className=" flex flex-col justify-between bg-cover bg-center  ">

      <div className="w-full bg-image h-screen">
        <div className="w-full h-3/4">
          <ProfileNavBar />
          <div className="flex flex-row items-center justify-between w-full h-full ">
            <div className="flex flex-col h-1/2 w-1/4 justify-center bg-white ml-3 rounded-3xl items-center ">
              <h1 className="font-medium text-3xl text-cyan-900 ">
                Welcome to our website
              </h1>
              <h1 className="font-medium text-base text-black">
                {" "}
                Welcome to our website
              </h1>
            </div>
          </div>
        
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Home;
