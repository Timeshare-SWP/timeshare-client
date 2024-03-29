import { BrowserRouter as Router } from "react-router-dom";
import UserRouter from "./routers/UserRouter";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import AdminRouter from "./routers/AdminRouter";
import AuthContextProvider from "./contexts/authContext";
import { StoreProvider } from "../src/redux/StoreProvider";

function App() {
  // const store = createStore({
  //   authName: "_auth",
  //   authType: "cookie",
  //   cookieDomain: window.location.hostname,
  //   cookieSecure: false,
  // });

  return (
    // <AuthProvider store={store}>
    <StoreProvider>
      <Router>
        <AuthContextProvider>
          <UserRouter />
          <AdminRouter />
          <Toaster position="top-right" />
        </AuthContextProvider>
      </Router>
    </StoreProvider>

    // </AuthProvider>
  );
}

export default App;
