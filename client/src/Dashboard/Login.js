import React, { useEffect } from "react";
import { useState } from "react";
import "./Login.css";
import PropTypes from "prop-types";
import axios from "axios";
import { useAlert } from "react-alert";

export default function Login({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setpassword] = useState();
  const [userCount, setUserCount] = useState();
  const alert = useAlert();

  useEffect(() => {
    axios
      .get("/api/users/count")
      .then((res) => {
        setUserCount(res.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/users/login", {
        username: username,
        password: password,
      })
      .then((response) => {
        setToken(response.data.token);
        localStorage.setItem("token", JSON.stringify(response.data.token));
      })
      .catch(function (error) {
        alert.error("login failed");
        console.log(error);
      });
  };

  const createAccount = () => {
    axios
      .post("/api/users/signup", {
        username: "admin",
        email: "admin@99fud.com",
        password: "admin123",
        role: "admin",
      })
      .then((res) => {
        if (res.status === 201) {
          alert.success("new user created");
        } else {
          alert.error("add user failed");
        }
      })
      .catch((error) => {
        console.log(error);
        alert.error("add user failed");
      });
  };

  const createAccButton = () => {
    if (!(userCount > 0)) {
      return (
        <div className="newAccount">
          <button
            onClick={() => {
              createAccount();
            }}
          >
            create Account
          </button>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <div className="login">
      <h1> Employees Only</h1>
      <form onSubmit={handleSubmit}>
        <label>
          username:{""}
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            required
          />
        </label>
        <label>
          password:{""}
          <input
            type="password"
            value={password}
            onChange={(e) => setpassword(e.currentTarget.value)}
            required
          />
        </label>

        <button type="submit"> Log in</button>
      </form>
      {createAccButton()}
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
