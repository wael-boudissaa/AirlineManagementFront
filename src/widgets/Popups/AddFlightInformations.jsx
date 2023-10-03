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
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddFlightInformations = ({
  openFlightInformations,
  setOpenFlightInformations,
}) => {


  const [duration, setDuration] = useState('')
  const [destination, setDestination] = useState('')

  const [flightfrom, setFlightFrom] = useState('')



  const postFligtInfo = async () => {
    try {
      const postData = await fetch("http://localhost:5001/flightinfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
         
          duration: duration,
          destination: destination,
          flightfrom: flightfrom,
        })  ,
      });
      if (postData.ok) {
        toast.success("post suceces");
      } else {
        console.log("err");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Dialog
        size="lg"
        open={openFlightInformations}
        className="bg-transparent shadow-none"
        handler={() => setOpenFlightInformations(!openFlightInformations)}>
        <Card className="mx-auto w-full max-w-[28rem]">
          <ToastContainer/>
          <CardHeader
            variant="gradient"
            className="m-5 flex justify-center items-center h-11 place-items-center">
            <h1>Add Flight</h1>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Enter the duration of the flight  : " value={duration} onChange={(e)=> {setDuration(e.target.value)}}></Input>

            <Input label="Enter the Flight Start from " value={flightfrom} onChange={(e)=> {setFlightFrom(e.target.value)}}></Input>

            <Input label="Enter the destination " value={destination} onChange={(e)=> {setDestination(e.target.value)}}></Input>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={() => {
                setOpenFlightInformations(!openFlightInformations);
                postFligtInfo()
              }}
              fullWidth>
              Add Flight Information 
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default AddFlightInformations;
