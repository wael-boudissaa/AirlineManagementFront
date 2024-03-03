import React, { useEffect, useState } from "react";
import {
  Card,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { affichageId } from "./TableEmployeToday";
import { formatDateTime } from "../Cards/ListFlights";
import { useNavigate } from "react-router-dom";
const TableFlights = () => {
  const TABLE_HEAD = ["Flight Name", "Date Flight", "From", "Destination", ""];
  const [flight,setFlight]= useState([])
  useEffect(() => {
    const fetchflights = async () => {
      try {
        const data = await fetch("https://airlinemanagementback.onrender.com/flight/all", {
          method: "GET",
        });
        if (data.ok){ 
          const result = await data.json()
          setFlight(result.result)
        }
      } catch (err) {}
    };
    fetchflights()
  }, []);
  const navigate = useNavigate()
  return (
    <Card className="h-fit w-full overflow-scroll bg-transparent my-9">
      <table className="w-full min-w-max table-auto text-left bg-white ">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {flight.map(
            ({ idflight, dateflight, flightfrom, destination }, index) => {
              const isLast = index === flight.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {affichageId(idflight) }
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {formatDateTime(dateflight) }
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {flightfrom}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {destination}
                    </Typography>
                  </td>{" "}
                  <td className={`${classes} bg-blue-gray-50/50`} onClick={()=> {navigate(`/admin/flight/${idflight}`)}}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium">
                      See more
                    </Typography>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </Card>
  );
};

export default TableFlights;
