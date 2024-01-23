import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const AuthContext = createContext({});

const API_URL = `${process.env.REACT_APP_API_URL}`;

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const [currentToken, setCurrentToken] = useState(Cookies.get("token"));
  const [isLoadingEvent, setIsLoadingEvent] = useState(false);

  const [userDecode, setUserDecode] = useState(() => {
    const storedItem = localStorage.getItem("user");
    return storedItem ? JSON.parse(storedItem) : {};
  });

  // Side Effects

  useEffect(() => {
    Cookies.set("token", currentToken, { expires: 1, secure: true });
  }, [currentToken]);

  useEffect(() => {
    localStorage.setItem(
      "user",
      userDecode && Object.keys(userDecode).length
        ? JSON.stringify(userDecode)
        : null
    );
  }, [userDecode]);

  // function login normally
  const login = async (inputs) => {
    try {
      setIsLoadingEvent(true);
      const res = await axios.post(`${API_URL}` + "/api/auth/login", {
        ...inputs,
      });

      const token = res.data.accessToken;
      setCurrentToken(token);

      const user = jwtDecode(token);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const resUser = await axios.get(
        `${API_URL}` + `/api/users/${user.user.id}`,
        config
      );
      setUserDecode(resUser?.data ?? {});
      // navigate("/");
      setIsLoadingEvent(false);

      if (["Admin"].includes(user.user.roleName)) {
        navigate("/admin");
      } else {
        navigate("/my_account");
      }
    } catch (error) {
      toast.error("Gmail or password is not correct");
      // if(error?.response?.data) {
      setIsLoadingEvent(false);
      // }
    }
  };

  //function logout
  const logout = async () => {
    try {
      setIsLoadingEvent(true);
      setCurrentToken(null);
      setUserDecode({});
      setIsLoadingEvent(false);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userDecode,
        setUserDecode,
        currentToken,
        login,
        logout,
        isLoadingEvent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
