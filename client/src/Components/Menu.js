import React, { Children, useState } from "react";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import { SidebarData, SidebarSocialMedia } from "./SidebarData";
import "./Menu.css";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import Badge from "@material-ui/core/Badge";

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [{ basket }] = useStateValue();

  const setOrderCount = (val) => {
    if (val === "Order") {
      return <Badge className="orderCount" badgeContent={basket?.length} />;
    }

    return;
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="Menu">
      <div className="MenuToggle" onClick={toggleMenu}>
        <MenuRoundedIcon fontSize="large" />
      </div>
      <nav className={`MenuBox ${isOpen ? "active" : "inactive"}`}>
        <ul className="MenuList">
          {SidebarData.map((val, key) => {
            return (
              <li key={key} className="row" onClick={toggleMenu}>
                <NavLink to={val.link} activeClassName="active" exact>
                  <div className="rowInside">
                    <div>{val.title}</div>
                    {setOrderCount(val.title)}
                  </div>
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className="MenuSocialMedia">
          {SidebarSocialMedia.map((val, key) => {
            return (
              <NavLink to={val.url} className="icon" key={key}>
                {val.icon}
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
