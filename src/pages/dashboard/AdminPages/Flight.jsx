/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavbarFlight from "../../../widgets/NavbarFlight";
import img from "../../../Images/airplane.jpeg";
import { TableEmploye } from "../../../widgets/Tables/TableEmploye";
import TableEmployeFlight from "../../../widgets/Tables/TableEmployeFlight";
import { affichageId } from "../../../widgets/Tables/TableEmployeToday";
const Flight = () => {
  const [flightInfo, setFlightInfo] = useState([]);
  const [employeFlight, setEmployeFlight] = useState([]);
  const objectflight = useParams();
  useEffect(() => {
    const fetchFlight = async () => {
      console.log(objectflight)
      try {
        const result = await fetch(
          `http://localhost:5001/flight/this?idflight=${objectflight.idflight}`,
          {
            method: "GET",
          }
        );
        if (result.ok) {
          const data = await result.json();
          setFlightInfo(data.result);
          console.log(data.result)
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchFlight();
  }, [objectflight.idflight]);

  useEffect(() => {
    const fetchEmployeFlight = async () => {
      try {
        const result = await fetch(
          `http://localhost:5001/employe/this?idflight=${objectflight.idflight}`,
          {
            method: "GET",
          }
        );
        if (result.ok) {
          const data = await result.json();
          setEmployeFlight(data.result);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchEmployeFlight();
  }, []);

  return (
    
    <section className="flex flex-col w-full h-full ">
      {flightInfo.length > 0 ? ( 
        <div>  <NavbarFlight />
        <div className="flex flex-row w-full h-full my-9 ">
          <di className="fles flex-col w-5/12 h-full rounded-lg ">
            <div className="flex flex-row  p-5">
              <h1 className="ml-6 text-xl text-blue-400">This airplane : {flightInfo[0].idagence}</h1>
            <h1 className="ml-6 text-xl text-blue-400"> of the agence :{flightInfo[0].idairplane}</h1>
            </div>
            <div className="flex flex-row items-center justify-center">
              <img
                className="rounded-sm w-1/2 h-1/2"
                src={img}
                alt="plane image"
              />
            </div>
          </di>
          
            <div className="flex flex-col  bg-teal-100 w-7/12 h-full rounded-l-2xl  p-10  ">
              <h1 className="text-2xl  font-semibold ">
              Name of the flight :  {affichageId(flightInfo[0].idflight)}
              </h1>
              <div className="flex flex-row w-full justify-between p-5 my-4">
                <h2 className="text-lg font-sans text-blue-gray-700">
                   From : {flightInfo[0].flightfrom}
                </h2>
                <h2 className="text-lg font-sans text-blue-gray-700">
                  {" "}
                  Destination : {flightInfo[0].destination}
                </h2>
                <h3 className="self-center ml-5 text-lg">
                {" "}
                 Duration :{flightInfo[0].duration}
              </h3>
              </div>
           
              <div className="my-10 ">
                <h1 className="text-xl font-semibold">
                  {" "}
                  Description of the flight :
                </h1>
                <p className=" mx-4 my-2 text-sm">{flightInfo[0].description}</p>
              </div>
              <div className="flex flex-row justify-around w-full mt-4">
                <h1 className="text-xl  text-black">
                  Pilot name : {flightInfo[0].idpilot}
                </h1>
                <h1 className="text-xl  text-black">
                airplane  : {flightInfo[0].idairplane}
                </h1>
              </div>
            </div>      
        </div> 
    <TableEmployeFlight employe={employeFlight} setEmploye={setEmployeFlight} flightInfo={flightInfo}  /></div>
    
  ):(<div>waiting </div>)}
    </section>
  
  );
};

export default Flight;
