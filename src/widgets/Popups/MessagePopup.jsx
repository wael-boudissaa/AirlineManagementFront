import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
} from "@material-tailwind/react";
import AuthContext from "../../context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const MessagePopup = ({ openMessage, setOpenMessage, messages }) => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState();
  const sendMessage = async () => {
    try {
      const fetchData = await fetch(
        `http://localhost:5001/message/ticket/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idprofile: user.id,
            message: message,
            idticket: messages[0].idticket,
          }),
        }
      );
      if (fetchData.ok) {
        const result = await fetchData.json();
        toast.success(result.msg);
        console.log(result.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Dialog
        open={openMessage}
        handler={() => {
          setOpenMessage(!openMessage);
        }}>
        <ToastContainer />
        <div className="flex items-center justify-between">
          <DialogHeader>Messages</DialogHeader>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mr-3 h-5 w-5"
            onClick={() => {
              setOpenMessage(!openMessage);
            }}>
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <DialogBody divider className="  w-full p-9 flex flex-col">
          {messages.map(({ text, source }) => (
            <div
              className={`flex flex-col justify-center  w-2/5 my-2 p-2 rounded-lg ${
                user.id === source ? "self-end bg-blue-900 text-white " : "self-start bg-blue-gray-100 text-black text-m"
              }`}>
              {/* <Input label= color={` ${ user.id === source ? "bg-orange-500" : ("bg-blue-gray-50")}`} disabled className={`w-full   `}/> */}
              {/* <h1 className="text-black"> {user.id} 
              {source}</h1> */}

              {text}
            </div>
          ))}
        </DialogBody>
        <DialogFooter className="space-x-2 ">
          <div className="flex flex-row w-full px-5 items-center ">
            {" "}
            <Input
              label="Enter Your Message  "
              className=""
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
            <Button
              variant="gradient"
              color="green"
              className="ml-5 px-7 py-3"
              onClick={() => {
                setOpenMessage(!openMessage);
                sendMessage();
                setMessage("");
              }}>
              Send
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default MessagePopup;
