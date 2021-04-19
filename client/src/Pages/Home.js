import React from "react";
import "./Home.css";
import pic1 from "../images/pic1.jpg";
import pic2 from "../images/beet-salad.jpg";
import pic3 from "../images/pic3.jpg";
import Card from "../Components/Card";
import { NavLink } from "react-router-dom";
import Contact from "../Components/Contact";
import { NavHashLink } from "react-router-hash-link";

function Home() {
  return (
    <div className="home">
      <section className="home__welcome">
        <div>
          <h1>Welcome</h1>
        </div>
        <div>
          <button className="home__welcomeButton">
            <NavLink to="/order">
              <div>Start Order</div>
            </NavLink>
          </button>
        </div>
        <div>
          <p>Blah Blah Blah</p>
        </div>
      </section>
      <section className="home__intro">
        <div>
          <h1>Our Services</h1>
        </div>
        <div>
          <p>We provide three types of products. </p>
        </div>

        <div className="home__introCards">
          <div className="home__introCardsContainer">
            <NavHashLink to="/menu#FastFood">
              <Card title="Fast Food" image={pic1} body="for a quick grab" />
            </NavHashLink>

            <p>Classic Fast Food for people who wants to grab a quick lunch </p>
          </div>
          <div className="home__introCardsContainer">
            <NavHashLink to="/menu#Healthy">
              <Card title="Healthy" image={pic2} body="healthy options" />
            </NavHashLink>
            <p> Try our healthy dishes for those on a diet </p>
          </div>
          <div className="home__introCardsContainer">
            <NavHashLink to="/menu#GetCooking">
              <Card title="Get Cooking" image={pic3} body="be your own chef" />
            </NavHashLink>
            <p>
              {" "}
              Cook at your home with all the ingredients delivered to you along
              with its instructions.{" "}
            </p>
          </div>
        </div>
        <div className="home__introOpt">
          <p>See our full menu from the button below</p>
          <button className="home__introButton">
            <NavHashLink to="/menu#Menu">
              <div>Full Menu</div>
            </NavHashLink>
          </button>
        </div>
      </section>
      <section className="home__end">
        <div className="home__endUs">
          <h1></h1>
          <p>
            We have come to the market of food business in order to provide all
            the customers with variety of mouth watering foods made by our
            professional chefs at our semi-ghost kitchen. Ensuring proper
            hygiene and quality products, we offer our online and off line
            services of supplying various easy delicious foods either at your
            place or ours. Focusing ourselves to provide you an easiest online
            food service we offer various different foods from the world’s
            street.
          </p>
          <button className="home__endButton">
            <NavHashLink to="/aboutus#AboutUs">
              <div>More about us</div>
            </NavHashLink>
          </button>
        </div>
        <div className="home__endPolicy">
          <h2>Privacy Policy</h2>
          <ul>
            <li>
              99Fud (Ninety Nine Food Services Private Limited) collects
              personally identifiable information that you may voluntarily
              provide on online forms, which may include: user registration,
              contact requests, guest comments, online surveys, and other online
              activities. The personally identifiable information (Personal
              Information) collected on this Site / our Mobile Application can
              include some or all of the following: your name, address,
              telephone number, email addresses, demographic information, and
              any other information you may voluntarily provide.
            </li>
            <li>
              In addition to the Personal Information identified above, our web
              servers automatically identify computers by their IP addresses.
              Company may use IP addresses to analyze trends, administer the
              site track user’s movement and gather broad demographic
              information for aggregate use. To emphasize, IP addresses are not
              linked to Personal.
            </li>
          </ul>

          <h2> Disclaimer</h2>
          <ul>
            <li>
              It is your own responsibility to ensure that you are fully aware
              of all of these terms and conditions when making a purchase on
              www.99Fud.com / 99Fud Mobile Applications.
            </li>
            <li>
              99Fud (Ninety Nine Food Services Private Limited) reserves the
              right to change / modify these terms & conditions at their own
              discretion anytime.
            </li>
            <li>
              The images shown are only indicative in nature & the actual
              product may vary in size, colour etc.
            </li>
            <li>
              99Fud (Ninety Nine Food Services Private Limited) reserves the
              right to change any part or piece of information on this web site
              without any notice to customers or visitors.
            </li>
          </ul>
        </div>
        <Contact />
      </section>
    </div>
  );
}

export default Home;
