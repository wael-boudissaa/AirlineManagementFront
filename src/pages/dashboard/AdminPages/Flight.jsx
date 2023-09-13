import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Flight = () => {
  const [flightInfo, setFlightInfo] = useState([]);
  const objectflight = useParams();
  console.log(objectflight.idflight);
  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const result = await fetch(
          `http://localhost:5001/flight/this?idflight=${objectflight.idflight}`,
          {
            method: "GET",
          }
        );
        if (result.ok) {
          const data = await result.json();
          console.log(data.msg);
          setFlightInfo(data.result);
          console.log(data.result);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchFlight();
  }, [objectflight.idflight]); // Add objectflight.idflight as a dependency

  return (
    <section className="flex flex-col w-full h-full">
      <div className="flex flex-row w-full h-full">
        {flightInfo.length > 0 ? (
          <div className="flex flex-col items-center bg-blue-gray-50 w-7/12 h-full rounded-md  ">
            <h1 className="text-4xl font-serif font-semibold ">
              {flightInfo[0].idflight}
            </h1>
            <div className="flex flex-row w-full justify-around">
              <h2 className="text-2xl font-sans text-blue-gray-700">
                the flight from : {flightInfo[0].flightfrom}
              </h2>
              <h2 className="text-2xl font-sans text-blue-gray-700">
                {" "}
                the destination : {flightInfo[0].destination}
              </h2>
            </div>
            <h3 className="self-start ml-5">
              {" "}
              The duration of the flight is : {flightInfo[0].duration}
            </h3>
            <div>
              <h1>Description of the flight :</h1>
              <p className=" text-xs m-8">
             { flightInfo[0].description}
              </p>
            </div>
            <div className="flex flex-row justify-around w-full">
              <h1>the pilot name : {flightInfo[0].idpilot}</h1>
              <h1>the airline name : {flightInfo[0].idairplane}</h1>

            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
};

export default Flight;
