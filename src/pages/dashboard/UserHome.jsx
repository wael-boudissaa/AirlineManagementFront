import React, { useContext, useEffect, useState } from "react";
import ProfileNavBar from "../../widgets/ProfileNavBar";
import CardHome from "../../widgets/Cards/CardHome";
import AuthContext from "../../context/UserContext";
import { Footer } from "../../widgets/Footer";
import { formatDateTime } from "../../widgets/Cards/ListFlights";
const UserHome = () => {
  const { user } = useContext(AuthContext);
  const [flightUser, setFlightUser] = useState([])
  useEffect(() => {
    const getFlightUser = async () => {
      try {
        const fetchData = await fetch(`http://localhost:5001/flight/q?idprofile=${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        if (fetchData.ok) {
          const result = await fetchData.json();
          setFlightUser(result[0])
        }
      } catch (err) {
        console.log(err);
      }
    };
    getFlightUser()
  }, []);
  useEffect(()=>{console.log(user.id)},[])
  return (
    <div className=" flex flex-col justify-between bg-cover bg-center  ">
      <div className="w-full bg-image h-screen">
        <div className="w-full h-3/4">
          <ProfileNavBar />
          <div className="flex flex-row items-center justify-between w-full h-full ">
            <div className="flex flex-col h-1/2 w-1/4 justify-center bg-white ml-3 rounded-3xl items-center ">
              <h1 className="font-medium text-3xl text-cyan-900 ">Welcome</h1>
              <h1 className="font-medium text-base text-black">
                here you can find all the informations concerning your flight
              </h1>
            </div>
          {flightUser?<div className="flex flex-col h-3/4 w-1/4 justify-center bg-cyan-700 mr-10 rounded-l-3xl items-center">
            <h1 className="font-medium text-3xl text-white ">
              Your next flight gonna be
            </h1>
            <h3>{formatDateTime(flightUser.dateflight)}</h3>
         </div> : 
          <div  className="flex flex-col h-3/4 w-1/4 justify-center bg-cyan-700 mr-10 rounded-l-3xl items-center">
  <h1 className="font-medium text-xl text-white ">
You have no flight YET            </h1>
          </div>
          }
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
      <Footer />
    </div>
  );
};

export default UserHome;
