import { BrowserRouter } from "react-router-dom";
import UserRouter from "./routers/UserRouter";

function App() {
  return (
    <BrowserRouter>
      <UserRouter />
    </BrowserRouter>
  );
}

export default App;
