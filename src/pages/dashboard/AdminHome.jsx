import React, { useContext, useEffect, useState } from "react";
import { Sidenav } from "../../widgets/Sidenav";
import { TableEmployeToday } from "../../widgets/Tables/TableEmployeToday";
import { ListFlights } from "../../widgets/Cards/ListFlights";
import { IconButton } from "@material-tailwind/react";
import { AddFlightPopup } from "../../widgets/Popups/AddFlightPopup";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/UserContext";

const AdminHome = () => {
  const [openPAddFlight, setOpenP] = useState(false);
  const [flightToday, setFlightToday] = useState([]);
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();
  const { authTokens } = useContext(AuthContext);

  useEffect(() => {
    const fetchTodayFlights = async () => {
      try {
        const fetchData = await fetch("http://localhost:5001/flight/today", {
          method: "GET",
          headers: {
            authorization: `Bearer ${authTokens}`,
          },
        });
        if (fetchData.ok) {
          const data = await fetchData.json();
          setFlightToday(data.result);
        } else {
          console.log({ msg: "Error" });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchTodayFlights();
  }, []);
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const fetchData = await fetch("http://localhost:5001/flight", {
          method: "GET",
        });
        if (fetchData.ok) {
          const data = await fetchData.json();
          setFlights(data.result);
        } else {
          console.log({ msg: "Error" });
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchFlights();
  }, []);

  return (
    <div className="flex flex-row bg-blue-gray-50">
      <Sidenav />
      <div className="w-full my-4 mx-4">
        <div>
          <div className="w-full flex flex-row justify-between">
            <h1 className="text-2xl">Flights Planned next 30 days</h1>
            <IconButton
              onClick={() => {
                setOpenP(!openPAddFlight);
              }}>
              <i class="fa-solid fa-plus"></i>{" "}
            </IconButton>
          </div>
          <div className="flex flex-row flex-wrap justify-between">
            {" "}
            {flights.map(
              ({ idflight, dateflight, flightfrom, destination, duration }) => (
                <div
                  className="w-5/12"
                  onClick={() => navigate(`flight/${idflight}`)}>
                  {" "}
                  <ListFlights
                    idflight={idflight}
                    dateflight={dateflight}
                    flightfrom={flightfrom}
                    destination={destination}
                    duration={duration}
                  />
                </div>
              )
            )}
          </div>
        </div>
        <div>
          <h1 className="text-2xl">Today Employe Flights</h1>
          {flightToday.map(({ idflight }) => (
            <TableEmployeToday idflight={idflight} />
          ))}
        </div>
      </div>
      <AddFlightPopup openPAddFlight={openPAddFlight} setOpenP={setOpenP} />
    </div>
  );
};

export default AdminHome;
