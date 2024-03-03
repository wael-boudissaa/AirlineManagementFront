import React, { useContext, useEffect, useState } from "react";
import { Sidenav } from "../../../widgets/Sidenav";
import AuthContext from "../../../context/UserContext";
import MessagePopup from "../../../widgets/Popups/MessagePopup";

const Inbox = () => {
  const { user } = useContext(AuthContext);
  const [ticket, setTicket] = useState([]);
  const [openMessage, setOpenMessage] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getidAdmin = async () => {
      try {
        const fetchData = await fetch(
          `https://airlinemanagementback.onrender.com/employe/adm?idprofile=${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (fetchData.ok) {
          const result = await fetchData.json();
          try {
            const fetchData = await fetch(
              `https://airlinemanagementback.onrender.com/message/ticket/admin?adminid=${result[0].adminid}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (fetchData.ok) {
              const result = await fetchData.json();
              setTicket(result);
              console.log(result);
              localStorage.setItem("nbrticket", result.length);
            }
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getidAdmin();
  }, []);
  const getMessages = async (idticket) => {
    try {
      const fetchData = await fetch(
        `https://airlinemanagementback.onrender.com/message/ticket/messages?idticket=${idticket}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (fetchData.ok) {
        const result = await fetchData.json();
        setMessages(result);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-row w-full justify-between ">
      <Sidenav />
      <div className="w-full my-12 mx-7">
        <h1 className="my-7 text-3xl">Tickets </h1>
        {ticket.map(({ title, idticket, email, first_name }) => (
          <div
            class="p-4 mb-4  rounded-lg bg-blue-50  flex flex-row justify-between items-center"
            role="alert">
            <div className="flex flex-col w-fit">
              {" "}
              <span class="font-medium">{first_name}</span>
              <span className="text-xs">{email}</span>
            </div>

              <span class="font-medium">Ticket Title : {title}</span>

            <div
              className="flex flex-row items-center cursor-pointer"
              onClick={() => {
                getMessages(idticket);
                setOpenMessage(!openMessage);
              }}>
              {" "}
              <p>Check for messages </p>
              <i class="mx-4 fa-solid fa-angles-right"> </i>
            </div>
          </div>
        ))}
      </div>
      <MessagePopup
        openMessage={openMessage}
        setOpenMessage={setOpenMessage}
        messages={messages}
      />
    </div>
  );
};

export default Inbox;
