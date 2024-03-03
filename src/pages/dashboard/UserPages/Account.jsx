import React, { useContext, useEffect, useState } from "react";
import ProfileNavBar from "../../../widgets/ProfileNavBar";
import img from "../../../Images/airplane.jpeg";
import AuthContext from "../../../context/UserContext";
const Account = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const getInfoUser = async () => {
      try {
        const fetchInfoUser = await fetch("https://airlinemanagementback.onrender.com/profile/one", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idprofile: user.id,
          }),
        });
        if (fetchInfoUser.ok) {
          const data = await fetchInfoUser.json();
          console.log(data)
          setUserInfo(data[0]);
        } else {
          console.log({ msg: "Error" });
        }
      } catch (err) {
        console.log(err);
      }
    };
    getInfoUser();
  }, []);
  return (
    <div className="flex flex-col h-screen bg-blue-gray-50   w-full ">
      <ProfileNavBar />
      <div className="flex flex-row h-full w-full  ">
        <div className="flex flex-col my-12 h-2/6 w-4/12 mx-10">
          <div className=" w-1/2 rounded-full flex items-center flex-col ">
            {" "}
            <img src={img} className="rounded-full  " />
            <span className="mt-3"> Edit Image</span>
          </div>
          <div className="flex  ">
            <ul className="flex flex-col bg-blue-gray-100 p-8 rounded-xl">
              <li className="p-2 border-black border rounded-lg mt-3 cursor-pointer flex  justify-center">
                Information Profile
              </li>
              <li className="p-2 border-black border rounded-lg mt-3 cursor-pointer flex justify-center ">
                Account Management
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col ">
          <h1 className="text-5xl">Hello {userInfo.first_name}</h1>
          <div className=" flex self-start my-14 ">
            <div className=" flex flex-row justify-between">
              {" "}
              <div className="flex flex-col mx-8">
                {" "}
                <label>First Name </label>
                <input className="bg-green-50 px-6 py-2"  readOnly value={userInfo.first_name}/>
              </div>
              <div className="flex flex-col">
                {" "}
                <label>Last Name</label>
                <input className="bg-green-50 px-6 py-2"  readOnly value={userInfo.last_name}/>
              </div>
            </div>
          </div>
          <div className=" flex flex-row justify-between">
            {" "}
            <div className="flex flex-col mx-8">
              {" "}
              <label>Adresse</label>
              <input className="bg-green-50 px-6 py-2"  readOnly value={userInfo.adresse}/>
            </div>
            <div className="flex flex-col">
              {" "}
              <label>Email</label>
                <input className="bg-green-50 px-6 py-2"  readOnly value={userInfo.email}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
