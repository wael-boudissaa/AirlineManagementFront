import React, { useState } from "react";
import { Sidenav } from "../../../widgets/Sidenav";
import { IconButton } from "@material-tailwind/react";
import AddGroupe from "../../../widgets/Popups/AddGroupe";

const Setting = () => {
  const [openAddGroupe, setOpenAddGroupe] = useState(false);
  return (
    <div className="flex flex-row bg-blue-gray-50">
      <Sidenav />
      <div className="w-full my-8 mx-4">
        <div className="flex flex-row items-center ">
          <h1>Create a new Groupe </h1>
          <IconButton
            onClick={() => {
              setOpenAddGroupe(!openAddGroupe);
            }}>
            <i class="fa-solid fa-plus"></i>{" "}
          </IconButton>
        </div>
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
