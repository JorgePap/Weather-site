import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./router/Routing";
// import { NavBar } from "./ui/lib";

function App() {
  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Routing />
    </BrowserRouter>
  );
}

export default App;
