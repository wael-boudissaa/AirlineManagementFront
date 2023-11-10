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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Select, initTE } from "tw-elements";
import { affichageId } from "../Tables/TableEmployeToday";
initTE({ Select });

const AffectEmployeFlight = ({
  openAffect,
  setOpenAffect,
  flightInfo,
  handleActionHappened,
}) => {
  const [groupe, setGroupe] = useState([]);
  const [employe, setEmploye] = useState([]);
  const [selectedGroupe, setSelectedGroupe] = useState("All");
  const [selectedEmploye, setSelectedEmploye] = useState(selectedGroupe[0]);

  const getGroupes = async () => {
    try {
      const result = await fetch("http://localhost:5001/groupe", {
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
      } else {
        console.log("err");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getEmployeDependGroupe = async (name_groupe) => {
    try {
      if (name_groupe !== "all") {
        const result = await fetch(
          `http://localhost:5001/groupe/hasnoflights?name_groupe=${name_groupe}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        if (result.ok) {
          const data = await result.json();
          setEmploye(data);
          console.log(data);
        } else {
          console.log("err");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDataEmploye = async () => {
    try {
      const data = await fetch(`http://localhost:5001/employe/hasnoflight`, {
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

  const affectEmployeToFlight = async () => {
    try {
      const result = await fetch("http://localhost:5001/employe/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          idflight: flightInfo[0].idflight,
          idemploye: selectedEmploye,
        }),
      });
      if (result.ok) {
        const data = await result.json();
        toast.success(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-full">
      <Dialog
        open={openAffect}
        handler={() => {
          setOpenAffect(!openAffect);
        }}
        className="w-9/12 h-9/12">
        <ToastContainer />

        <div className="flex items-center justify-between">
          <DialogHeader>Affect Employe</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={() => {
              setOpenAffect(!openAffect);
            }}>
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody divider>
          <h1>Flight Name</h1>
          <Input
            label={
              flightInfo[0] ? affichageId(flightInfo[0].idflight) : "nothing"
            }
            disabled
          />
          <div
            onClick={() => {
              getGroupes();

              fetchDataEmploye();
            }}>
            <label
              for="select-1"
              class="block text-sm font-medium mb-2 dark:text-white">
              Select the Groupe of the Employe
            </label>
            <div class="relative">
              <select
                id="select-1"
                class="py-3 px-4 pr-16 block w-full border-transparent dark:text-gray-400"
                value={selectedGroupe}
                onChange={(e) => {
                  setSelectedGroupe(e.target.value);
                }}>
                <option>Select groupe name </option>

                {groupe.map(({ name_groupe }) => (
                  <option>{name_groupe}</option>
                ))}
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-8">
                {/* <svg
                  class="h-4 w-4 text-red-500"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg> */}
              </div>
            </div>

            {/* <p class="text-sm text-red-600 mt-2">
              Please select a valid state.
            </p> */}
          </div>
          <div
            onClick={() => {
              if (selectedEmploye !== "Select groupe name")
                selectedGroupe === "All"
                  ? fetchDataEmploye()
                  : getEmployeDependGroupe(selectedGroupe);
            }}>
            <label
              for="select-1"
              class="block text-sm font-medium mb-2 dark:text-white">
              Select the Employe of
            </label>
            <div class="relative">
              <select
                id="select-1"
                className="py-3 px-4 pr-16 block w-full border-transparent dark:text-gray-400"
                value={selectedEmploye}
                onChange={(e) => {
                  const selectedValue = JSON.parse(e.target.value);
                  setSelectedEmploye(selectedValue.idemploye);
                }}
                aria-label="Select an employe">
                <option>Select employe name</option>

                {employe.length > 0 ? (
                  employe.map(({ first_name, idemploye }) => (
                    <option
                      key={idemploye}
                      value={JSON.stringify({ idemploye, first_name })}>
                      {first_name}
                    </option>
                  ))
                ) : (
                  <option> There is no employes on this groupe </option>
                )}
              </select>

              {employe.length === 0 &&
                selectedGroupe !== "Select groupe name" && (
                  <div className="text-red-500 text-lg ">
                    {" "}
                    There is no employes to affect yet{" "}
                  </div>
                )}

              <div class="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-8">
                {/* <svg
                  class="h-4 w-4 text-red-500"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  aria-hidden="true">
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg> */}
              </div>
            </div>

            {/* <p class="text-sm text-red-600 mt-2">
              Please select a valid state.
            </p> */}
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              affectEmployeToFlight();
              handleActionHappened();
            }}>
            Affect Employe
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default AffectEmployeFlight;
