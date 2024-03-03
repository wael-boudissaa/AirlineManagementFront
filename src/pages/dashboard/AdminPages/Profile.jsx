import React, { useState } from "react";
import { Sidenav } from "../../../widgets/Sidenav";
import { TableEmploye } from "../../../widgets/Tables/TableEmploye";
import SearchProfile from "../../../widgets/Cards/SearchProfile";

const Profile = () => {
  const [employe, setEmploye] = useState([]);
  const [groupeAffect, setGroupeAffect] = useState([]);
  const [groupe, setGroupe] = useState([]);

  const getGroupes = async () => {
    try {
      const result = await fetch("https://airlinemanagementback.onrender.com/groupe", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (result.ok) {
        const data = await result.json();
        const newdata = [...data];
        newdata.unshift({ id: "all", name_groupe: "All" });

        setGroupe(newdata);
        setGroupeAffect(data);
      } else {
        console.log("err");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchDataEmploye = async () => {
    try {
      const data = await fetch(`https://airlinemanagementback.onrender.com/employe`, {
        methode: "GET",
      });
      if (data.ok) {
        const result = await data.json();
        setEmploye(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-row bg-blue-gray-50">
      <Sidenav />
      <div className="w-full my-8 mx-4">
        <div className="flex flex-col items-center ">
          <SearchProfile
            employe={employe}
            setEmploye={setEmploye}
            fetchDataEmploye={fetchDataEmploye}
            getGroupes={getGroupes}
            groupe={groupe}
          />
          <TableEmploye
            employe={employe}
            setEmploye={setEmploye}
            groupeAffect={groupeAffect}
            fetchDataEmploye={fetchDataEmploye}
            getGroupes={getGroupes}

/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
