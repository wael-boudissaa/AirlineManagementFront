import React, { useEffect, useState } from "react";
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

const AffectProfile = ({
  openaffectProfile,
  setOpenAffectProfile,
  profileInfo,
  handleActionHappened
}) => {
  const [isAoE, setIsAoE] = useState("Admin");
  useEffect(() => {
    console.log(isAoE);
  }, [isAoE]);
  const affectEmploye = async (idprofile) => {
    try {
      const result = await fetch("http://localhost:5001/employe", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idprofile: idprofile,
        }),
      });

      if (result.ok) {
        const data = await result.json();
        console.log(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const affectadmin = async (idprofile) => {
    try {
      const result = await fetch("http://localhost:5001/employe/profileadmin ", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idprofile: idprofile,
        }),
      });

      if (result.ok) {
        const data = await result.json();
        console.log(data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Dialog
        size="lg"
        open={openaffectProfile}
        className="bg-transparent shadow-none"
        handler={() => setOpenAffectProfile(!openaffectProfile)}>
        <Card className="mx-auto w-full max-w-[28rem]">
          <CardHeader
            variant="gradient"
            className="m-5 flex justify-center items-center h-11 place-items-center">
            <h1>Affect Profile</h1>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label={profileInfo.first_name} disabled></Input>
            <Input label={profileInfo.email} disabled></Input>
            <select value={isAoE} onChange={(e) => setIsAoE(e.target.value)}>
              <option>Admin</option>
              <option>Employee</option>
            </select>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              onClick={() => {
                setOpenAffectProfile(!openaffectProfile);
                if (isAoE === "Employee") {
                  affectEmploye(profileInfo.idprofile);handleActionHappened()
                }
                else if (isAoE==="Admin") {affectadmin(profileInfo.idprofile); handleActionHappened()}
              }}
              fullWidth>
              Affect Profile
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
};

export default AffectProfile;
