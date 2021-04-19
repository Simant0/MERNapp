import React, { useState, useEffect } from "react";
import "./Menu.css";
import ProductCard from "../Components/ProductCard";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { NavHashLink } from "react-router-hash-link";
import axios from "axios";

function Menu() {
  const [products, setProducts] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios
      .get("/api/products")
      .then((res) => {
        const item = res.data.product;
        setProducts(item);
        console.log(item);
        //sortProducts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  var fastFood = [];
  var healthy = [];
  var getCooking = [];
  var getCookingFF = [];

  const sortProducts = () => {
    if (products !== "") {
      products.map((val, key) => {
        if (val.type === "fast food") {
          fastFood.push(val);
        } else if (val.type === "healthy") {
          healthy.push(val);
        } else if (val.type === "get cooking") {
          getCooking.push(val);
        } else if (val.type === "get cookingff") {
          getCookingFF.push(val);
        }
      });
    }
    console.log("fastfood " + fastFood);
  };
  if (products.length > 0) {
    sortProducts();
}
    return (
      <div className="menu" id="Menu">
        <div className="menu__heading">
          <h1> Menu</h1>
        </div>
        <div className="menu__upper">
          <section className="menu__fastfood" id="FastFood">
            <div className="menu__fastfood Heading">
              <h2>Fast Food</h2>
            </div>
            <div className="menu__fastfood Intro">
              <p>Classic Street food from all around the world.</p>
            </div>
            <div className="menu__fastfood Products">
              {fastFood.map((val, key) => {
                return (
                  <ProductCard
                    id={val._id}
                    name={val.name}
                    image={val.image}
                    info={val.info}
                    price={val.price}
                    type={val.type}
                  />
                );
              })}
            </div>
          </section>
          <section className="menu__healthy" id="Healthy">
            <div className="menu__healthy Heading">
              <h2>Healthy Foods</h2>
            </div>
            <div className="menu__healthy Intro">
              <p>Fresh and healthy.</p>
            </div>
            <div className="menu__healthy Products">
              {healthy.map((val, key) => {
                return (
                  <ProductCard
                    id={val._id}
                    name={val.name}
                    image={val.image}
                    info={val.info}
                    price={val.price}
                    type={val.type}
                  />
                );
              })}
            </div>
          </section>
        </div>

        <div className="menu__getCooking" id="GetCooking">
          <div className="menu__getCooking Heading">
            <h2>Get Cooking </h2>
          </div>
          <div className="menu__getCookingIntro">
            <h3>
              This package is brought up in order to solve 2 specific problems
              of customers in their daily life:
            </h3>
            <ul>
              <li>
                To solve the problem of not receiving quiet warm food during
                most of the deliveries. How? We deliver you our “ready to get
                cook” food from the menu listed and now u are able to cook the
                dish fresh and very easily for yourself and your family as well.
              </li>
              <li>
                To make it easy for you to enjoy your gathering time with
                family, friends and loved ones. How? We make sure you get
                “various style BBQ meats” of various cuisines and ready to go
                over the fire. You cook; you enjoy and don’t waste your precious
                time in marinating the meats for BBQ and GRILLs. (We will do
                it!!!)
              </li>
            </ul>
            <h3>Package Details:</h3>
            <ul>
              <li>You will get the pre assembled dish with its side dishes</li>

              <li>You will get the sauce or salad vegetables of the dish </li>
              <li>
                In case of any meat, it will be pre- marinated or crumbed as per
                the recipe for your ease
              </li>
              <li>
                You need to either fry, BBQ/grill, sauté or mix as per the
                Recipe Card provided to you
              </li>
              <li>
                Either make blogging, cook for yourself fresh or enjoy partying
                with loved ones
              </li>
            </ul>
          </div>
          <div className="menu__lower">
            <section className="menu__getCookingMenu">
              <div className="menu__getCookingMenu Heading">Cook at home</div>

              <div className="menu__getCookingMenu Products">
                {/* {GetCooking.map((val, key) => {
                return <GetCookingCard val={val} />;
              })} */}
                {getCooking.map((val, key) => {
                  return (
                    <ProductCard
                      id={val._id}
                      name={val.name}
                      image={val.image}
                      info={val.info}
                      price={val.price}
                      type={val.type}
                    />
                  );
                })}
              </div>
            </section>
            <section className="menu__getCookingFF">
              <div className="menu__getCookingFF Heading">From Fast Food</div>
              <div className="menu__getCookingFF Products">
                {/* {GetCookingFF.map((val, key) => {
                return <GetCookingCard val={val} />;
              })} */}
                {getCookingFF.map((val, key) => {
                  return (
                    <ProductCard
                      id={val._id}
                      name={val.name}
                      image={val.image}
                      info={val.info}
                      price={val.price}
                      type={val.type}
                    />
                  );
                })}
              </div>
            </section>
          </div>
        </div>
        <div className="goToOrder">
          <div className="goToOrderBox">
            <NavHashLink to="/order#Order">
              <div className="goToOrderArrows">
                <ArrowForwardIosIcon />
                <ArrowForwardIosIcon />
                <ArrowForwardIosIcon />
              </div>
              <div className="goToOrderText">Proceed to Order</div>
            </NavHashLink>
          </div>
        </div>
      </div>
    );
  } 
  /** else {
    return (
      <div className="menu" id="Menu">
        <div className="menu__heading">
          <h1> Menu</h1>
        </div>
        Getting Data.Please Wait...
        <div className="menu__upper">
          <section className="menu__fastfood" id="FastFood">
            <div className="menu__fastfood Heading">
              <h2>Fast Food</h2>
            </div>
            <div className="menu__fastfood Intro">
              <p>Classic Street food from all around the world.</p>
            </div>
           
          </section>
          <section className="menu__healthy" id="Healthy">
            <div className="menu__healthy Heading">
              <h2>Healthy Foods</h2>
            </div>
            <div className="menu__healthy Intro">
              <p>Fresh and healthy.</p>
            </div>
           
          </section>
        </div>

        <div className="menu__getCooking" id="GetCooking">
          <div className="menu__getCooking Heading">
            <h2>Get Cooking </h2>
          </div>
          <div className="menu__getCookingIntro">
            <h3>
              This package is brought up in order to solve 2 specific problems
              of customers in their daily life:
            </h3>
            <ul>
              <li>
                To solve the problem of not receiving quiet warm food during
                most of the deliveries. How? We deliver you our “ready to get
                cook” food from the menu listed and now u are able to cook the
                dish fresh and very easily for yourself and your family as well.
              </li>
              <li>
                To make it easy for you to enjoy your gathering time with
                family, friends and loved ones. How? We make sure you get
                “various style BBQ meats” of various cuisines and ready to go
                over the fire. You cook; you enjoy and don’t waste your precious
                time in marinating the meats for BBQ and GRILLs. (We will do
                it!!!)
              </li>
            </ul>
            <h3>Package Details:</h3>
            <ul>
              <li>You will get the pre assembled dish with its side dishes</li>

              <li>You will get the sauce or salad vegetables of the dish </li>
              <li>
                In case of any meat, it will be pre- marinated or crumbed as per
                the recipe for your ease
              </li>
              <li>
                You need to either fry, BBQ/grill, sauté or mix as per the
                Recipe Card provided to you
              </li>
              <li>
                Either make blogging, cook for yourself fresh or enjoy partying
                with loved ones
              </li>
            </ul>
          </div>
          <div className="menu__lower">
            <section className="menu__getCookingMenu">
              <div className="menu__getCookingMenu Heading">Cook at home</div>

             
            </section>
            <section className="menu__getCookingFF">
              <div className="menu__getCookingFF Heading">From Fast Food</div>
             
            </section>
          </div>
        </div>
        <div className="goToOrder">
          <div className="goToOrderBox">
            <NavHashLink to="/order#Order">
              <div className="goToOrderArrows">
                <ArrowForwardIosIcon />
                <ArrowForwardIosIcon />
                <ArrowForwardIosIcon />
              </div>
              <div className="goToOrderText">Proceed to Order</div>
            </NavHashLink>
          </div>
        </div>
      </div>
  
    );
  }
}*/

export default Menu;
