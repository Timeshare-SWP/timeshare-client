import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { auth, providerGoogle } from "../utils/configFirebase";
import { signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { checkEmailExisted } from "../redux/features/userSlice";

export const AuthContext = createContext({});

const API_URL = `${process.env.REACT_APP_API_URL}`;

export default function AuthContextProvider({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Gmail or password is not correct");
      // if(error?.response?.data) {
      setIsLoadingEvent(false);
      // }
    }
  };

  //function login with google by firebase
  const loginWithGoogle = async (props) => {
    try {
      setIsLoadingEvent(true);
      const res = await axios.post(`${API_URL}/api/auth/loginGoogle`, {...props});

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
      setIsLoadingEvent(false);

      const currentPath = window.location.pathname;

      if (["Admin"].includes(user.user.roleName)) {
        navigate("/admin-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi login Google");
      console.error("Error during Google login:", error);
      // Xử lý lỗi ở đây nếu cần
      setIsLoadingEvent(false);
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
        loginWithGoogle,
        logout,
        isLoadingEvent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
