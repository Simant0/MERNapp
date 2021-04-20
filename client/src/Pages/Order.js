import React from "react";
import { useState, useEffect } from "react";
import "./Order.css";
import { useStateValue } from "../StateProvider";
import Cart from "../Components/Cart";
import { NavLink } from "react-router-dom";
import { getBasketTotal } from "../reducer";
import axios from "axios";
import { useAlert } from "react-alert";
import { CopyToClipboard } from "react-copy-to-clipboard";
import KhaltiCheckout from "khalti-checkout-web";

function Order() {
  const [activeTab, setactiveTab] = useState(0);
  const [{ basket }, dispatch] = useStateValue();
  const alert = useAlert();
  const minDelivery = 599;

  const deliveryLocations = [
    "Select",
    "Sankhamul",
    "Koteshwor",
    "Baneshwor",
    "New Road",
    "Chabahil",
  ];

  // form data for order status
  const [orderStatusId, setorderStatusId] = useState("");
  const [result, setresult] = useState("");

  // form data for placing order

  const [orderName, setorderName] = useState("");

  const [phone, setphone] = useState("");
  const [delivery, setdelivery] = useState("Select");
  const [gotOrderId, setgotOrderId] = useState();

  useEffect(() => {
    let localId = localStorage.getItem("orderId");
    let localName = localStorage.getItem("orderName");
    let localPhone = localStorage.getItem("phone");
    if (localId) {
      localId = JSON.parse(localId);

      setgotOrderId(localId);
      setorderStatusId(localId);
    }

    if (localName) {
      localName = JSON.parse(localName);
      setorderName(localName);
    }

    if (localPhone) {
      localPhone = JSON.parse(localPhone);
      setphone(localPhone);
    }
  }, []);

  const handleSubmitOS = (event) => {
    // on submit
    event.preventDefault();
    axios
      .get("/api/orders/orderStatus/" + orderStatusId)
      .then((result) => {
        console.log(result.data.order);

        const item = result.data;
        console.log(item);
        setresult(item);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showSearchResult = (searchResult) => {
    if (searchResult.order !== null && searchResult !== "") {
      return (
        <div className="searchResult">
          <div
            className={
              searchResult.order.status === "cooking"
                ? "search__cooking"
                : searchResult.order.status === "delivery"
                ? "search__delivery"
                : searchResult.order.status === "completed"
                ? "search__completed"
                : "search__ordered"
            }
          >
            <div> id: {searchResult.order._id}</div>
            <div> name: {searchResult.order.name}</div>
            <div> address: {searchResult.order.address}</div>
            <div>
              <h3> status: {searchResult.order.status} </h3>
            </div>
          </div>
        </div>
      );
    }
  };

  const handleSubmitNoKhalti = () => {
    // on submit
    // event.preventDefault();

    if (basket.length > 0 && delivery !== "Select") {
      axios
        .post("/api/orders", {
          name: orderName,
          address: delivery,
          phone: phone,
          price: getBasketTotal(basket),
          items: basket,
          token: "test",
        })
        .then((response) => {
          console.log("ordered");
          const orderId = response.data._id;
          localStorage.setItem("orderId", JSON.stringify(response.data._id));
          setgotOrderId(orderId);
          alert.success("ordered Please save orderid");

          dispatch({
            type: "EMPTY_BASKET",
          });
        })
        .catch(function (error) {
          console.log(error);
        });

      localStorage.setItem("orderId", JSON.stringify(gotOrderId));
      localStorage.setItem("orderName", JSON.stringify(orderName));
      localStorage.setItem("phone", JSON.stringify(phone));
    } else {
      if (basket.length < 1) {
        alert.error("please add items to the basket");
      } else {
        alert.error("please select a drop off point");
      }
    }
  };

  const toggleTab = (index) => {
    setactiveTab(index);
  };

  return (
    <div className="order" id="Order">
      <div className="order__heading">
        <h1>Order</h1>
        Your order id: {gotOrderId}
      </div>

      <div className="order__tab">
        <div className="order__tabHeading">
          <div className={activeTab === 0 ? "tabs activeTab" : "tabs"}>
            <button onClick={() => toggleTab(0)}>Place Order</button>
          </div>

          <div className={activeTab === 1 ? "tabs activeTab" : "tabs"}>
            <button onClick={() => toggleTab(1)}>Check Order Status</button>
          </div>
        </div>
        <div className="order__tabContent">
          <div
            className={activeTab === 0 ? "content activeContent" : "content"}
          >
            <div className="placeOrder">
              <h2>Place your order </h2>
              Minimum order of Rs: {minDelivery}
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                }}
              >
                <label>
                  Name{""}
                  <input
                    type="text"
                    value={orderName}
                    placeholder="name"
                    onChange={(e) => {
                      setorderName(e.currentTarget.value);
                      localStorage.setItem(
                        "orderName",
                        JSON.stringify(orderName)
                      );
                    }}
                    required
                  />
                </label>
                <label>
                  phone no{""}
                  <input
                    type="text"
                    value={phone}
                    placeholder="phone number"
                    onChange={(e) => {
                      setphone(e.currentTarget.value);
                      localStorage.setItem("phone", JSON.stringify(phone));
                    }}
                    required
                  />
                </label>

                <label>
                  Select drop off address
                  <select
                    value={delivery}
                    onChange={(e) => setdelivery(e.currentTarget.value)}
                  >
                    {deliveryLocations.map((val, key) => {
                      return <option value={val}>{val}</option>;
                    })}
                  </select>
                </label>

                {/* <div className="placeOrderButton">
                  <button type="submit"> Place Order</button>
                </div> */}
              </form>
              <div className="order__cart">
                {basket?.length === 0 ? (
                  <div>
                    <h3>Your basket is empty</h3>
                    <p>Add items from the menu. </p>
                    <div className="menuButton">
                      <NavLink to="/menu">
                        <button> See Menu</button>
                      </NavLink>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3> your order items</h3>
                    <h3> total items: {basket.length}</h3>

                    {basket.map((val, key) => (
                      <Cart
                        key={key}
                        id={val.id}
                        name={val.name}
                        price={val.price}
                        type={val.type}
                      />
                    ))}

                    <div className="subtotal">
                      subtotal:Rs {getBasketTotal(basket)}
                    </div>
                  </div>
                )}
              </div>
              <div className="payButton">
                <button
                  onClick={() => {
                    if (getBasketTotal(basket) > minDelivery) {
                      //handleKhalti();
                      handleSubmitNoKhalti();
                    } else {
                      alert.error("Minimum order is " + minDelivery);
                    }
                  }}
                >
                  Order
                </button>
              </div>
              <div>
                Your Order id is :
                <div className="copyOrderId">
                  <CopyToClipboard text={gotOrderId}>
                    <p>
                      {gotOrderId}
                      <button
                        onClick={() => {
                          localStorage.setItem(
                            "orderId",
                            JSON.stringify(gotOrderId)
                          );
                        }}
                      >
                        Copy to clipboard
                      </button>
                    </p>
                    {/* <button>Copy to clipboard</button> */}
                  </CopyToClipboard>
                </div>
              </div>
            </div>
          </div>

          <div
            className={activeTab === 1 ? "content activeContent" : "content"}
          >
            <div className="orderStatus">
              <h2> Check your order status </h2>
              <form onSubmit={handleSubmitOS}>
                <label>
                  Order Id:{" "}
                  <input
                    type="text"
                    value={orderStatusId}
                    onChange={(e) => setorderStatusId(e.currentTarget.value)}
                    required
                  />
                </label>
                <div className="orderStatusButton">
                  <button type="submit"> Submit</button>
                </div>
              </form>
            </div>
            <div className="orderStatusResult">{showSearchResult(result)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
