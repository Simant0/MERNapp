import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Menu from "./Pages/Menu";
import Order from "./Pages/Order";
import Dashboard from "./Dashboard/Dashboard";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <Router>
      <div className="App">
        <Sidebar className="App__sidebar" />
        <Switch>
          <Route path="/menu">
            <div className="App__menu">
              <Menu />
            </div>
          </Route>
          <Route path="/order">
            <div className="App__order">
              <Order />
            </div>
          </Route>
          <Route path="/aboutus">
            <div className="App__aboutus">
              <AboutUs />
            </div>
          </Route>
          <Route path="/control">
            <div className="App__control">
              <Dashboard />
            </div>
          </Route>
          <Route path="/">
            <div className="App__home">
              <Home />
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
