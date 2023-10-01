import React from 'react'

const NavbarFlight = () => {
  return (
    <nav className="flex flex-row justify-between items-center bg-teal-100 p-4 rounded-b-3xl">
        <h1 className="text-3xl text-blue-gray-900">Wael Air </h1>
        <div className="w-5/12 mx-5 ">
          <ul className="flex flex-row justify-between items-center ">
            <li className="text-base cursor-pointer hover:text-blue-gray-600 font-semibold">
              Dashboard
            </li>
            <li className="text-base cursor-pointer hover:text-blue-gray-600 font-semibold">
              Profile
            </li>
            <li className="text-base cursor-pointer hover:text-blue-gray-600 font-semibold">
              Setting
            </li>
            <li className="text-base cursor-pointer hover:text-blue-gray-600 font-semibold">
              Inbox
            </li>
          </ul>
        </div>
      </nav>
  )
}

export default NavbarFlight