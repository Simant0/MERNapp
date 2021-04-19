import React from "react";
import { NavLink } from "react-router-dom";
import "./Contact.css";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";

function Contact() {
  return (
    <>
      <div className="home__endContact">
        <h2>Contact Us</h2>
        <ul style={{ listStyleType: "none" }}>
          <li> 99fud.colud@gmail.com</li>
          <li>Sankhamul, Kathmandu</li>
          <li>Nepal</li>
        </ul>
        <NavLink to="www.facebook.com">
          <FacebookIcon />
        </NavLink>
        <NavLink to="www.instagram.com">
          <InstagramIcon />
        </NavLink>
        <div className="controlLink">
          <NavLink to="/control">for employees only</NavLink>
        </div>
      </div>
    </>
  );
}

export default Contact;
