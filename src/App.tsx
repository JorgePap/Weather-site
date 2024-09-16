import "./App.css";
import { HashRouter } from "react-router-dom";
import { Routing } from "./router/Routing";
// import { NavBar } from "./ui/lib";

function App() {
  const basename = "/Weather-site/";

  return (
    <HashRouter basename={basename}>
      {/* <NavBar /> */}
      <Routing />
    </HashRouter>
  );
}

export default App;
