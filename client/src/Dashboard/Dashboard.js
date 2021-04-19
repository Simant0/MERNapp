import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Orders from "./Orders";
import Products from "./Products";
import Users from "./Users";

function Dashboard() {
  const [token, setToken] = useState("");

  useEffect(() => {
    let localToken = localStorage.getItem("token");
    if (localToken) {
      localToken = JSON.parse(localToken);
      setToken(localToken);
    }
  }, []);

  if (!token) {
    return <Login setToken={setToken} />;
  }
  return (
    <div className="Dashboard">
      <Router>
        <div className="Dashboard__header">
          <NavLink to="/">
            <h1> Dashboard</h1>
          </NavLink>
          <div className="LogoutButton">
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setToken("");
              }}
            >
              logout
            </button>
          </div>
        </div>
        <div className="Dashboard__routes">
          <div className="Dashboard__Buttons">
            <button>
              <NavLink to="/dproducts">
                <div>Products</div>
              </NavLink>
            </button>
            <button>
              <NavLink to="/dusers">
                <div>Users</div>
              </NavLink>
            </button>
            <button>
              <NavLink to="/dorders">
                <div>Orders</div>
              </NavLink>
            </button>
          </div>
          <Switch>
            <Route path="/dproducts">
              <div className="Dashboard__products">
                <Products token={token} />
              </div>
            </Route>
            <Route path="/dusers">
              <div className="Dashboard__users">
                <Users token={token} />
              </div>
            </Route>
            <Route path="/dorders">
              <div className="Dashboard__orders">
                <Orders token={token} />
              </div>
            </Route>
            <Route path="/">
              <div className="Dashboard__entry">Hello</div>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default Dashboard;
