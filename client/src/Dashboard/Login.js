import React, { useEffect } from "react";
import { useState } from "react";
import "./Login.css";
import PropTypes from "prop-types";
import axios from "axios";
import { useAlert } from "react-alert";

export default function Login({ setToken }) {
  const [username, setUsername] = useState();
  const [password, setpassword] = useState();
  const alert = useAlert();

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
