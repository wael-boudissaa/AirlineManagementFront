import React, { useEffect, useState } from "react";

const SearchProfile = ({
  getGroupes,
  employe,
  setEmploye,
  groupe,
  fetchDataEmploye,
}) => {
  const [openDropDown, setOpenDropDown] = useState(false);
  const [groupeSelected, setGroupeSelected] = useState("");
  const [employeSearch, setEmployeSearch] = useState("");

  const FindEmploye = () => {
    const val = employeSearch;
    const foundEmployee = employe.find((employee) => employee.first_name === val);
  
    if (foundEmployee) {
      console.log(foundEmployee);
    } else {
      console.log("Employee not found");
    }
  };
  

  const getEmployeDependGroupe = async (name_groupe) => {
    try {
      if (name_groupe !== "all") {
        const result = await fetch(
          `http://localhost:5001/groupe/this?name_groupe=${name_groupe}`,
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
          console.log(employe);
        } else {
          console.log("err");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div class="flex w-full h-11">
      <div className="flex flex-col">
        <button
          id="dropdown-button"
          data-dropdown-toggle="dropdown"
          class="flex-shrink-0  z-10 inline-flex items-center py-2.5 px-2.5  text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          type="button"
          onClick={() => {
            setOpenDropDown(!openDropDown);
            getGroupes();
          }}>
          {groupeSelected ? groupeSelected : "All"}
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
        </button>
        {openDropDown && (
          <div
            id="dropdown"
            class="z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ">
            <ul
              class="py-2 text-sm text-gray-700 dark:text-gray-200 flex flex-col"
              aria-labelledby="dropdown-button">
              {groupe.map(({ name_groupe }) => (
                <li>
                  <button
                    type="button"
                    class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                      if (name_groupe !== "All") {
                        getEmployeDependGroupe(name_groupe);
                        setOpenDropDown(!openDropDown);
                        setGroupeSelected(name_groupe);
                      } else {
                        fetchDataEmploye();
                        setOpenDropDown(!openDropDown);
                        setGroupeSelected(name_groupe);
                      }
                    }}>
                    {name_groupe}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div class="relative  w-full">
        <input
          type="search"
          id="search-dropdown"
          class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Search Mockups, Logos, Design Templates..."
          value={employeSearch}
          onChange={(e) => {
            setEmployeSearch(e.target.value);
          }}
          required
        />
        <button
          type="submit"
          class="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={()=> {
            FindEmploye();
            console.log('hlo')
          }}>
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </div>
    </div>
  );
};

export default SearchProfile;
