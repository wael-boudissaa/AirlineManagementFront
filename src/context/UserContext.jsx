import jwtDecode from "jwt-decode";
import { createContext, useEffect, useState } from "react";
const AuthContext = createContext();

export default AuthContext;

export const UserContext = ({ children }) => {
  let [user, setUser] = useState(() =>
    localStorage.getItem("token")
      ? jwtDecode(localStorage.getItem("token"))
      : ""
  );

  let [refreshToken, setRefreshToken] = useState("");
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  const [userInfo, setUserInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getUser = async (user) => {
    try {
      setIsLoading(true);

      const response = await fetch("https://airlinemanagementback.onrender.com/sign/in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
        }),
      });

      if (!response.ok) {
        setError("Email or password is incorrect");
        setIsLoading(false);
        return;
      }

      const responseData = await response.json();
      const token = responseData.data.accessToken;
      setRefreshToken(responseData.data.refreshToken);

      if (!token) {
        setError("Token not found in response");
        setIsLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("username", responseData.data.user.first_name);
      if (responseData.data.user.status === "employe") {
        window.location.assign(
          `https://airline-management-front.vercel.app/${responseData.data.user.idprofile}`
        );
      } else if (responseData.data.user.status === "admin") {
        window.location.assign(`/admin`);
      } else if (responseData.data.user.status === "") {
        window.location.assign(`/`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const Logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");

    window.location.assign("/signin");

  };

  const updateToken = async (idprofile) => {
    let res;
  
    try {
      const response = await fetch("https://airlinemanagementback.onrender.com/sign/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idprofile: idprofile }),
      });
  
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem("token", data.newAccessToken);
        setUser(jwtDecode(data.newAccessToken));
        setAuthTokens(data.newAccessToken);
        res = true;
      } else {
        Logout();
        res = false;
      }
    } catch (error) {
      console.error("Token update failed:", error);
      res = false;
    }
  
    return res;
  };
  
  let contextData = {
    user: user,
    authTokens: authTokens,
    Logout: Logout,
    getUser: getUser,
    userInfo: userInfo,
    isLoading: isLoading,
  };

  useEffect(() => {
    const REFRESH_INTERVAL = 1000 * 14 * 60;
    let interval = setInterval(() => {
      if (authTokens) {
        updateToken(user.id);
      }
    }, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
