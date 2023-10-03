import React, { useContext, useEffect, useState } from "react";
import ProfileNavBar from "../../widgets/ProfileNavBar";
import CardHome from "../../widgets/Cards/CardHome";
import AuthContext from "../../context/UserContext";
import { Footer } from "../../widgets/Footer";
import { formatDateTime } from "../../widgets/Cards/ListFlights";
import { Input, Option, Select } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UserHome = () => {
  const { user, userInfo } = useContext(AuthContext);
  const [flightUser, setFlightUser] = useState([]);
  const [listAdmins, setListAdmins] = useState([]);
  const [adminSelected, setAdminSelected] = useState();
  const [employe, setEmploye] = useState();
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const fetchAdmins = async () => {
    try {
      const fetchData = await fetch(`http://localhost:5001/message`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (fetchData.ok) {
        const result = await fetchData.json();
        setListAdmins(result);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const getFlightUser = async () => {
      try {
        const fetchData = await fetch(
          `http://localhost:5001/flight/q?idprofile=${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (fetchData.ok) {
          const result = await fetchData.json();
          setFlightUser(result[0]);
          setEmploye(result[0].idemploye);
        }
      } catch (err) {
        console.log(err);
      }
    };
    const getEmploye = async()=> {
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
          setEmploye(result[0].idemploye)
    }
    }
    catch(err){
      console.log(err)
    }
    }
    getFlightUser();
    getEmploye()
    console.log(userInfo);
  }, []);
  useEffect(() => {
    console.log(user.id);
  }, []);

  const createTicket = async () => {
    try {
      const fetchData = await fetch(`http://localhost:5001/message/ticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          idemploye: employe,
          adminid: adminSelected,
          message: text,
          idprofile : user.id
        }),
      });
      if (fetchData.ok) {
        const result = await fetchData.json();
        toast.success(result.msg);
        console.log(result.msg)
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" flex flex-col justify-between bg-cover bg-center  ">
      <div className="w-full bg-image h-screen">
        <div className="w-full h-3/4">
          <ProfileNavBar />
          <ToastContainer />
          <div className="flex flex-row items-center justify-between w-full h-full ">
            <div className="flex flex-col h-1/2 w-1/4 justify-center bg-white ml-3 rounded-3xl items-center ">
              <h1 className="font-medium text-3xl text-cyan-900 ">Welcome</h1>
              <h1 className="font-medium text-base text-black">
                here you can find all the informations concerning your flight
              </h1>
            </div>
            {flightUser ? (
              <div className="flex flex-col h-3/4 w-1/4 justify-center bg-cyan-700 mr-10 rounded-l-3xl items-center">
                <h1 className="font-medium text-3xl text-white ">
                  Your next flight gonna be
                </h1>
                <h3>{formatDateTime(flightUser.dateflight)}</h3>
              </div>
            ) : (
              <div className="flex flex-col h-3/4 w-1/4 justify-center bg-cyan-700 mr-10 rounded-l-3xl items-center">
                <h1 className="font-medium text-xl text-white ">
                  You have no flight YET{" "}
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl ml-5 my-7"> News</h1>
        <div className="flex flex-row items-center flex-wrap justify-between">
          <CardHome />
          <CardHome />
          <CardHome />
          <CardHome />
        </div>
      </div>
      <div className="flex flex-col items-center m-12 p-5">
        <h1 className="text-3xl ml-5 my-7"> Contact Us </h1>
        <h2 className="text-xl ml-5 my-4">
          {" "}
          Complete this form and we will get back to you{" "}
        </h2>
        <div className=" flex flex-row w-full justify-between">
          <div className="flex flex-col justify-between h-full w-5/12 items-center">
            {" "}
            <Input
              className="p-3 w-3/12 "
              label={`${localStorage.getItem("username")}`}
              disabled
            />
            <Input
              className="p-3 w-3/12 "
              label="Give a Title To your problem"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <span className="self-start mt-4">
              Enter Your Message right here{" "}
            </span>
            <textarea
              className="mt-2 mb-4 self-start resize-none p-4 w-7/12 rounded"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
          </div>
          <div className="flex flex-col w-5/12 justify-center items-center">
            <Select
              label="Select the Admin you wish contact "
              onClick={() => {
                fetchAdmins();
              }}>
              <Option>List of Admins</Option>
              {listAdmins.map(({ email, adminid }) => (
                <Option
                  onClick={() => {
                    setAdminSelected(adminid);
                    
                  }}>
                  {email}{" "}
                </Option>
              ))}
            </Select>
          </div>
        </div>
        <button
          className="bg-black rounded w-9/12 text-white p-4 hover:bg-gray-800 delay-150 ease-in"
          onClick={() => {
            createTicket();
            console.log(employe)
       
          }}>
          Send Your Message{" "}
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default UserHome;
