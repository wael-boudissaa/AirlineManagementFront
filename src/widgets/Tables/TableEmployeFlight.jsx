import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import {
  Card,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import AffectEmployeFlight from "../Popups/AffectEmployeFlight";
const TableEmployeFlight = ({ employe ,flightInfo}) => {
  const TABLE_HEAD = [
    "First Name",
    "Second Name",
    "Email",
    "Location",
    <IconButton onClick={() => {setOpenAffect(!openAffect)}}>
      <i class="fa-solid fa-plus"></i>
    </IconButton>,
  ];
  const [openAffect , setOpenAffect] = useState(false)

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

        {employe.length > 0 ? (
          <tbody>
            {employe.map(
              ({ first_name, last_name, email, adresse, idemploye }, index) => {
                const isLast = index === employe.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={idemploye}>
                    {" "}
                    {/* Add a unique key for each row */}
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal">
                        {first_name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal">
                        {last_name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal">
                        {email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal">
                        {adresse}
                      </Typography>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        ) : (
          <tbody className="flex justify-center items-center">
            <tr>
              <td colSpan="5">There are no employees yet.</td>
            </tr>
          </tbody>
        )}
      </table>
      <AffectEmployeFlight openAffect={openAffect} setOpenAffect ={setOpenAffect} flightInfo={flightInfo} />
    </Card>
  );
};

export default TableEmployeFlight;
