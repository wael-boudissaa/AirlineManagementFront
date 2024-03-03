import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";

const AddGroupe = ({ openAddGroupe, setOpenAddGroupe }) => {
  const [groupeName, setGroupeName] = useState("");
  const handleOpen = () => setOpenAddGroupe(!openAddGroupe);
  const addGroupe = async () => {
    let data = {};
    try {
      const result = await fetch("https://airlinemanagementback.onrender.com/groupe/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          table_name: groupeName,
        }),
      });
      if (result.ok) {
        data = await result.json();
        console.log(data);
      } else {
        console.log(data.err);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Dialog open={openAddGroupe} handler={handleOpen}>
        <div className="flex items-center justify-between">
          <DialogHeader>Add Groupe</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={handleOpen}>
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody divider>
          <div className="grid gap-6">
            <Input label="Groupe name " onChange={(e) =>{ setGroupeName(e.target.value);console.log(groupeName)}} />
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              handleOpen();
              addGroupe();
            }}>
            Add Groupe
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AddGroupe;
