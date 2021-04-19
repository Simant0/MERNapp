import React, { useState, useEffect } from "react";
import "./Users.css";
import axios from "axios";
import { useAlert } from "react-alert";
import Modal from "../Components/Modal";

function Users(props) {
  const { token } = props;
  const [accounts, setAccounts] = useState("");
  const [addForm, setAddForm] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [role, setRole] = useState("");
  const alert = useAlert();

  useEffect(() => {
    getAccounts();
  }, []);

  const closeForm = () => {
    setAddForm(false);
  };

  const userCard = (user) => {
    if (user !== "") {
      const id = user.id;
      return (
        <div className="users__card">
          <div className={user.role === "admin" ? "adminCard" : "otherCard"}>
            <div>username: {user.username}</div>
            <div>email: {user.email}</div>
            <div>role: {user.role}</div>
            <div>
              <button
                onClick={() => {
                  deleteAccount(id);
                  getAccounts();
                }}
              >
                delete
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  const getAccounts = () => {
    axios
      .get("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const item = res.data.users;
        setAccounts(item);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAccount = (userId) => {
    axios
      .delete("/api/users/" + userId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        alert.error("user deletion failed");
      });
    alert.success(userId);
  };

  const createAccount = () => {
    axios
      .post(
        "/api/users/signup",
        {
          username: username,
          email: email,
          password: password,
          role: role,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 201) {
          alert.success("new user created");
          clearForm();
        } else {
          alert.error("add user failed");
        }
      })
      .catch((error) => {
        console.log(error);
        alert.error("add user failed");
      });
  };

  const clearForm = () => {
    setUsername("");
    setPassword("");
    setConfirmPw("");
    setEmail("");
    setRole("");
    setAddForm(false);
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (password === confirmPw) {
      createAccount();
    } else {
      alert.error("passwords do not match");
    }
    getAccounts();
  };

  if (accounts.length > 0) {
    return (
      <div className="users">
        <div className="users__buttons">
          <button
            onClick={() => {
              setAddForm(!addForm);
            }}
          >
            Add new User
          </button>
        </div>
        <div className="users__add">
          <Modal show={addForm}>
            <div className="users__addForm">
              <h2>Add user</h2>
              <form onSubmit={submitForm}>
                <label>
                  username{""}
                  <input
                    type="text"
                    value={username}
                    placeholder="username"
                    onChange={(e) => setUsername(e.currentTarget.value)}
                    required
                  />
                </label>
                <label>
                  email{""}
                  <input
                    type="email"
                    value={email}
                    placeholder="email"
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    required
                  />
                </label>
                <label>
                  password{""}
                  <input
                    type="password"
                    value={password}
                    placeholder="password"
                    onChange={(e) => setPassword(e.currentTarget.value)}
                    required
                  />
                </label>
                <label>
                  confirm password{""}
                  <input
                    type="password"
                    value={confirmPw}
                    placeholder="confirm password"
                    onChange={(e) => setConfirmPw(e.currentTarget.value)}
                    required
                  />
                </label>
                <div className="role">
                  <label>
                    <input
                      type="radio"
                      value="admin"
                      checked={role === "admin"}
                      onClick={() => {
                        setRole("admin");
                      }}
                    />
                    admin
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="merchant"
                      checked={role === "merchant"}
                      onClick={() => {
                        setRole("merchant");
                      }}
                    />
                    merchant
                  </label>
                </div>
                <div className="users__addFormButtons">
                  <div className="submitButton">
                    <button type="submit">Submit</button>
                  </div>

                  <div className="closeButton">
                    <button
                      onClick={() => {
                        closeForm();
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Modal>
        </div>
        <div>accounts count: {accounts.length}</div>
        <div className="users__display">
          {accounts.map((val, key) => {
            return userCard(val);
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="users">
        <div className="users__buttons">
          <button> Add new User</button>
        </div>
        no data
      </div>
    );
  }
}

export default Users;
