import React, { useState, useEffect } from "react";
import "./Orders.css";
import axios from "axios";
import { useAlert } from "react-alert";

function Orders(props) {
  const { token } = props;
  const [orders, setOrders] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [searchId, setSearchId] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const alert = useAlert();

  useEffect(() => {
    getOrders();
  }, []);

  const toggleTab = (index) => {
    setActiveTab(index);
  };

  const onClickStatus = (orderId, status) => {
    axios
      .patch(
        "/api/orders/" + orderId,
        { newStatus: status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        alert.success("changedStatus");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchOrder = (orderId) => {
    axios
      .get("/api/orders/" + orderId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSearchResult(res.data.order);
        console.log(searchResult);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteOrder = (orderId) => {
    axios
      .delete("/api/orders/" + orderId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        alert.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
        alert.error("order deletion failed");
      });
  };

  const getOrders = () => {
    axios
      .get("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const item = res.data.orders;
        setOrders(item);
        console.log(item);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var comOrders = [];
  var remOrders = [];

  const sortOrders = (orders) => {
    orders.map((val, key) => {
      if (val.status === "completed") {
        comOrders.push(val);
      } else {
        remOrders.push(val);
      }
    });
  };

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    searchOrder(searchId);
  };

  const orderCard = (order) => {
    if (order !== "") {
      return (
        <div>
          <div className="orders__card">
            <div
              className={
                order.status === "cooking"
                  ? "orders__cooking"
                  : order.status === "delivery"
                  ? "orders__delivery"
                  : order.status === "completed"
                  ? "orders__completed"
                  : "orders__ordered"
              }
            >
              <div> name: {order.name} </div>
              <div> id: {order._id} </div>
              <div> address: {order.address} </div>
              <div> date: {order.orderDate} </div>
              <div> status: {order.status} </div>
              <div> phone: {order.phone}</div>
              <div> items count: {order.items.length} </div>
              <div>
                items:
                {order.items.map((val, key) => {
                  return (
                    <div
                      key={key}
                      className={
                        val.item.type === "fast food"
                          ? "ffOrder"
                          : val.item.type === "healthy"
                          ? "hOrder"
                          : val.item.type === "get cooking"
                          ? "gOrder"
                          : "gfOrder"
                      }
                    >
                      <div> name: {val.item.name} </div>
                      <div> type: {val.item.type} </div>
                    </div>
                  );
                })}
              </div>
              <div className="orders__cardButtons">
                <button
                  onClick={() => {
                    onClickStatus(order._id, "cooking");
                    getOrders();
                  }}
                >
                  cook order
                </button>
                <button
                  onClick={() => {
                    onClickStatus(order._id, "delivery");
                    getOrders();
                  }}
                >
                  to delivery
                </button>
                <button
                  onClick={() => {
                    onClickStatus(order._id, "completed");
                    getOrders();
                  }}
                >
                  complete order
                </button>
                <div className="deleteButton">
                  <button
                    onClick={() => {
                      deleteOrder(order._id);
                      getOrders();
                    }}
                  >
                    delete order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>no data</div>;
    }
  };

  if (orders.length > 0) {
    sortOrders(orders);
    return (
      <div className="orders__outer">
        <div className="orders__search">
          <form onSubmit={handleSubmitSearch}>
            <label>
              orderId:{""}
              <input
                type="id"
                value={searchId}
                onChange={(e) => setSearchId(e.currentTarget.value)}
                placeholder="order id"
                required
              />
            </label>
            <button type="submit"> Search</button>
          </form>

          <div className="orders__searchResult">{orderCard(searchResult)}</div>
        </div>
        <div className="orders">
          <div className="orders__tab">
            <div className={activeTab === 0 ? "tabs activeTab" : "tabs"}>
              <button
                onClick={() => {
                  toggleTab(0);
                }}
              >
                Orders remaining
              </button>
            </div>
            <div className={activeTab === 1 ? "tabs activeTab" : "tabs"}>
              <button
                onClick={() => {
                  toggleTab(1);
                }}
              >
                Completed
              </button>
            </div>
          </div>
          <div>
            <div
              className={activeTab === 0 ? "content activeContent" : "content"}
            >
              <div>Remaining</div>
              <div>Remaining Orders count: {remOrders.length}</div>
              <div className="orders__display">
                {remOrders.map((val, key) => {
                  return orderCard(val);
                })}
              </div>
            </div>
            <div
              className={activeTab === 1 ? "content activeContent" : "content"}
            >
              <div>Completed</div>
              <div>Completed Orders count: {comOrders.length}</div>
              <div className="orders__display">
                {comOrders.map((val, key) => {
                  return orderCard(val);
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div> No data</div>;
  }
}

export default Orders;
