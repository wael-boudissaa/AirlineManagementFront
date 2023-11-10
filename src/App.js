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
import PrivateAdminRoute from "./utils/PrivateAdminRoute";
import PrivateEmployeRoute from "./utils/PrivateEmployeRoute";
import Users from "./pages/dashboard/AdminPages/Users";
import AllFlights from "./pages/dashboard/AdminPages/AllFlights";
import TicketsUser from "./pages/dashboard/UserPages/TicketsUser";
import Account from "./pages/dashboard/UserPages/Account";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/:userid"
        element={
          <PrivateEmployeRoute>
            <UserHome />
          </PrivateEmployeRoute>
        }
      />
      <Route
        path="/:userid/tickets"
        element={
          <PrivateEmployeRoute>
            <TicketsUser />
          </PrivateEmployeRoute>
        }
      />
      <Route
        path="/:userid/account"
        element={
          <PrivateEmployeRoute>
            <Account />
          </PrivateEmployeRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateAdminRoute>
            <AdminHome />
          </PrivateAdminRoute>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <PrivateAdminRoute>
            <Profile />
          </PrivateAdminRoute>
        }
      />
      <Route
        path="/admin/flight/:idflight"
        element={
          <PrivateAdminRoute>
            <Flight />
          </PrivateAdminRoute>
        }
      />

      <Route
        path="/admin/inbox"
        element={
          <PrivateAdminRoute>
            <Inbox />
          </PrivateAdminRoute>
        }
      />
      <Route
        path="/admin/settings"
        element={
          <PrivateAdminRoute>
            <Setting />
          </PrivateAdminRoute>
        }
      />
      <Route
        path="/admin/settings/profile"
        element={
          // <PrivateAdminRoute>
          <Users />
          /* </PrivateAdminRoute> */
        }
      />
      <Route
        path="/admin/settings/flights"
        element={
          <PrivateAdminRoute>
            <AllFlights />
          </PrivateAdminRoute>
        }
      />
    </Routes>
  );
}

export default App;
