import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";

const ProfilePopup = ({
  openGroupeAffect,
  setOpenGroupeAffect,
  getGroupes,
  groupeAffect,
  infoEmploye,
}) => {
  const affectEmploeToGroupe = async (table_name, idgroupe, idemploye) => {
    try {
      const affectEmploye = await fetch("https://airlinemanagementback.onrender.com/groupe/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table_name: table_name,
          idgroupe: idgroupe,
          idemploye: idemploye,
        }),
      });
      if (affectEmploye.ok) {
        const result = await affectEmploye.json();
        console.log(result.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [groupeSelected, setGroupeSelected] = useState("");
  const [idgroupeSelected, setIdGroupeSelected] = useState("");

  return (
    <>
      <Dialog
        open={openGroupeAffect}
        handler={() => {
          setOpenGroupeAffect(!openGroupeAffect);
        }}>
        <div className="flex items-center justify-between">
          <DialogHeader>Add Groupe</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={() => {
              setOpenGroupeAffect(!openGroupeAffect);
            }}>
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody divider>
          <div className="grid gap-6">
            <Input label={infoEmploye.first_name} disabled />
            <Input label={infoEmploye.last_name} disabled />
            <Input label={infoEmploye.adresse} disabled />
            <Input label={infoEmploye.email} disabled />

            <div onClick={() => getGroupes()}>
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Modify Groupe
              </label>
              <select
                id="countries"
                value={JSON.stringify({
                  idgroupe: idgroupeSelected,
                  name_groupe: groupeSelected,
                })}
                onChange={(e) => {
                  const selectedValue = JSON.parse(e.target.value);
                  setGroupeSelected(selectedValue.name_groupe);
                  setIdGroupeSelected(selectedValue.idgroupe);
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option>Select Groupe</option>
                {groupeAffect.map(({ name_groupe, idgroupe }) => (
                  <option
                    key={idgroupe}
                    value={JSON.stringify({ idgroupe, name_groupe })}>
                    {name_groupe}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              affectEmploeToGroupe(
                groupeSelected,
                idgroupeSelected,
                infoEmploye.idemploye
              );
              setOpenGroupeAffect(!openGroupeAffect);
              console.log(
                "selected value" + groupeSelected,
                idgroupeSelected,
                infoEmploye.idemploye
              );
            }}>
            Add Groupe
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default ProfilePopup;
