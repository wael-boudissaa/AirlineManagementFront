import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/dashboard/Home";
import SignIn from "./pages/auth/sign_in";
import SignUp from "./pages/auth/sign_up";
import UserHome from "./pages/dashboard/UserHome";
import { useContext } from "react";
import AuthContext from "./context/UserContext";
import AdminHome from "./pages/dashboard/AdminHome";
import Setting from "./pages/dashboard/AdminPages/Setting";
import Inbox from "./pages/dashboard/AdminPages/Inbox";
import Profile from "./pages/dashboard/AdminPages/Profile";
import Flight from "./pages/dashboard/AdminPages/Flight";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/user" element={<UserHome />} />
      <Route path="/admin" element={<AdminHome />} />
      <Route path="/admin/profile" element={<Profile />} />
      <Route path="/admin/flight/:idflight" element={<Flight />} />

      <Route path="/admin/inbox" element={<Inbox />} />
      <Route path="/admin/settings" element={<Setting />} />

      {/* <Route
        path="*"
        element={<Navigate to={permission ? "/" : "/signin"} />}
      /> */}
    </Routes>
  );
}

export default App;
