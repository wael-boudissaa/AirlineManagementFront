import React, { useState } from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Select,
  Option,
  IconButton,
} from "@material-tailwind/react";

export function AddFlightPopup({ openPAddFlight, setOpenP,actionHappened, setActionHappened }) {
  const [date, setDateSelected] = useState("");

  const [plane, setPlane] = useState([]);
  const [flightInfo, setFlightInfo] = useState([]);
  const [flightinfoSelected, setFlightInfoSelected] = useState("");
  const [planeSelected, setPlaneSelected] = useState("");
 
  const postFlight = async () => {
    try {
      const postData = await fetch("http://localhost:5001/flight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         
          dateflight: date,
          idairplane: planeSelected,
          idflightinfo: flightinfoSelected,
        })  ,
      });
      if (postData.ok) {
        console.log("post suceces");
        setActionHappened(!actionHappened)
        
      } else {
        console.log("err");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPlane = async () => {
    try {
      const fetchData = await fetch("http://localhost:5001/flightinfo/plane", {
        method: "GET",
      });
      if (fetchData.ok) {
        const data = await fetchData.json();
        setPlane(data.result);
      } else {
        console.log({ msg: "Error" });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchInfoFlight = async () => {
    try {
      const fetchData = await fetch("http://localhost:5001/flightinfo", {
        method: "GET",
      });
      if (fetchData.ok) {
        const data = await fetchData.json();
        setFlightInfo(data);
      } else {
        console.log({ msg: "Error" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Dialog
        size="lg"
        open={openPAddFlight}
        className="bg-transparent shadow-none"
        handler={() => setOpenP(!openPAddFlight)}>
        <Card className="mx-auto w-full max-w-[28rem]">
          <CardHeader
            variant="gradient"
            className="m-5 flex justify-center items-center h-11 place-items-center">
            <h1>Add Flight</h1>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Select
              size="lg"
              label="Select Airplane "
              onClick={() => fetchPlane()}>
              {plane.map(({ idairplane, nom, idagence }) => (
                <Option
                  onClick={() => {
                    setPlaneSelected(idairplane);
                  }}>
                  {" "}
                  name : {nom} Agence : {idagence}
                </Option>
              ))}
            </Select>
            <div className="flex flex-row justify-between ">
              <div className="w-2/3">
                <Select
                  label="Flight From Destination"
                  onClick={() => fetchInfoFlight()}>
                  {flightInfo.map(
                    ({ idflightinfo, flightfrom, destination }) => (
                      <Option
                        onClick={() => {
                          setFlightInfoSelected(idflightinfo);
                        }}>
                        From : {flightfrom} To : {destination}
                      </Option>
                    )
                  )}
                </Select>
              </div>

              <IconButton onClick={() => {}}>
                <i class="fa-solid fa-plus"></i>{" "}
              </IconButton>
            </div>
            <Input
              label="Enter the Date like this format : 2023-05-02"
              value={date}
              onChange={(e) => {
                setDateSelected(e.target.value);
              }}></Input>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={() => {
                setOpenP(!openPAddFlight);
                postFlight();
              }}
              fullWidth>
              Add Flight{" "}
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
