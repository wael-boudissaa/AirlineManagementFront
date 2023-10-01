import React, { useState } from "react";
import { Sidenav } from "../../../widgets/Sidenav";
import { IconButton } from "@material-tailwind/react";
import AddGroupe from "../../../widgets/Popups/AddGroupe";
import TableProfile from "../../../widgets/Tables/TableProfile";
import { Navigate, useNavigate } from "react-router-dom";

const Setting = () => {
  const navigate = useNavigate();
  const [openAddGroupe, setOpenAddGroupe] = useState(false);
  return (
    <div className="flex flex-row ">
      <Sidenav />
      <div className="w-full flex flex-col ">
        <div className="setting-page">
          <div className=" m-10 text-lg ">
            Setting Page
            <hr style={{ color: "#000", height: "5px" }} />
          </div>

          <div className="item">
            {" "}
            Add Flight Information
            <i class="fa-solid fa-arrow-right"></i>
          </div>
          <hr className="bg-black h-0.5 w-11/12 self-center" />
          <div
            className="item"
            onClick={() => {
              setOpenAddGroupe(!openAddGroupe);
            }}>
            {" "}
            Add and remove A Groupe <i class="fa-solid fa-arrow-right"></i>
          </div>
          <hr className="bg-black h-0.5 w-11/12 self-center" />

          <div
            className="item"
            onClick={() => {
              navigate("profile");
            }}>
            {" "}
            Table of Profiles <i class="fa-solid fa-arrow-right"></i>
          </div>
          <hr className="bg-black h-0.5 w-11/12 self-center" />

          <div className="item">
            {" "}
            Historique flights <i class="fa-solid fa-arrow-right"></i>
          </div>
          <hr className="bg-black h-0.5 w-11/12 self-center" />

          <div className="item">
            {" "}
            Historique Contact <i class="fa-solid fa-arrow-right"></i>
          </div>

          <hr className="bg-black h-0.5 w-11/12 self-center" />
        </div>
        {/* 
       <TableProfile/> */}

        {openAddGroupe && (
          <AddGroupe
            openAddGroupe={openAddGroupe}
            setOpenAddGroupe={setOpenAddGroupe}
          />
        )}
      </div>
    </div>
  );
};

export default Setting;
