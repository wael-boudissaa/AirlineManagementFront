import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import {
  Card,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import ProfilePopup from "../Popups/ProfilePopup";
import AffectProfile from "../Popups/AffectProfile";

const TABLE_HEAD = [
  "First Name",
  "Second Name",
  "Email",
  "Location",
  "status ",
];

const TableProfile = () => {
  const [profile, setProfile] = useState([]);
  const [profileInfo, setProfileInfo] = useState([]);
  const [actionHappened , setActionHappened] = useState(false)
  const [openaffectProfile, setOpenAffectProfile] = useState(false);
  const handleActionHappened = () => {setActionHappened(!actionHappened)}
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const result = await fetch("https://airlinemanagementback.onrender.com/profile", {
          method: "GET",
        });

        if (result.ok) {
          const data = await result.json();
          // Assuming `profile` is an array of objects

          setProfile(data); // Update the state with the modified array
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, [actionHappened]);
  return (
    <Card className="h-fit w-full overflow-scroll bg-transparent m-9">
      <table className="w-full min-w-max table-auto text-left bg-white ">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70">
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {profile.map(
            ({ first_name, last_name, email, adresse, status }, index) => {
              const isLast = index === profile.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {first_name}
                    </Typography>
                  </td>
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {last_name}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {email}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {adresse}
                    </Typography>
                  </td>{" "}
                  {/* <button
                  id="dropdownSearchButton"
                  data-dropdown-toggle="dropdownSearch"
                  data-dropdown-placement="bottom"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button">
                  Dropdown search{" "}
                  <svg
                    class="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6">
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button> */}
                  {/* <div>
                  <IconButton
                    variant="text"
                    color="blue-gray"
                    onClick={() => {
                      setOpenGroupeAffect(!openGroupeAffect);
                      setidselected(idemploye);
                    }}>
                    <PaperAirplaneIcon className="text-black-300 h-5 w-5" />
                  </IconButton>

                 
                </div> */}
                  <td className={`${classes} bg-blue-gray-50/50`}>
                    <Typography
                      as="a"
                      href="#"
                      variant="small"
                      color="blue-gray"
                      className="font-medium flex flex-row justify-between">
                      {status}
                      <PaperAirplaneIcon
                        className="w-5 self-end"
                        onClick={() => {
                          setOpenAffectProfile(!openaffectProfile);
                          setProfileInfo(profile[index])
                        }}
                      />
                    </Typography>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      {openaffectProfile&&<AffectProfile
        openaffectProfile={openaffectProfile}
        setOpenAffectProfile={setOpenAffectProfile}
        profileInfo= {profileInfo}
        handleActionHappened  = {handleActionHappened}
      />}
    </Card>
  );
};

export default TableProfile;
