import React, { useContext, useEffect, useState } from "react";
import { Sidenav } from "../../../widgets/Sidenav";
import MessagePopup from "../../../widgets/Popups/MessagePopup";
import AuthContext from "../../../context/UserContext";
import ProfileNavBar from "../../../widgets/ProfileNavBar";

const TicketsUser = () => {
  const [ticket, setTicket] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);
  const [openMessage, setOpenMessage] = useState(false);

  useEffect(() => {
    const getTicketsEmploye = async () => {
      try {
        const fetchData = await fetch(
          `http://localhost:5001/employe/one?idprofile=${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (fetchData.ok) {
          const result = await fetchData.json();
          console.log(result);

          try {
            const fetchData = await fetch(
              `http://localhost:5001/message/ticket/employe?idemploye=${result[0].idemploye}`,
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
            }
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getTicketsEmploye();
  }, []);
  const getMessages = async (idticket) => {
    try {
      const fetchData = await fetch(
        `http://localhost:5001/message/ticket/messages?idticket=${idticket}`,
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
    <div className="flex flex-col bg-blue-gray-50 w-full h-screen">
      <ProfileNavBar/>
      <div className="flex flex-row w-full justify-between ">
        <div className="w-full my-12 mx-7">
          <h1>Tickets </h1>
          {ticket.map(({ title, idticket }) => (
            <div
              class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 cursor-pointer flex flex-row justify-between"
              role="alert">
              <span class="font-medium">{title}</span>
              <div
                className="flex flex-row items-center"
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
    </div>
  );
};

export default TicketsUser;
