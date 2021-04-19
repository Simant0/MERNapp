import React from "react";
import "./Sidebar.css";
import { SidebarData, SidebarSocialMedia } from "./SidebarData";
import logo from "../images/99fudlogo.png";
import { Menu } from "./Menu";
import { NavLink } from "react-router-dom";
import { useStateValue } from "../StateProvider";
import Badge from "@material-ui/core/Badge";

function Sidebar() {
  const [{ basket }] = useStateValue();

  const setOrderCount = (val) => {
    if (val === "Order") {
      return <Badge className="orderCount" badgeContent={basket?.length} />;
    }

    return;
  };

  return (
    <div className="Sidebar">
      <NavLink to="/">
        <div className="SidebarLogo">
          <img className="SidebarLogoImage" src={logo} alt="" />
        </div>
      </NavLink>
      <ul className="SidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li key={key} className="row">
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
      <div className="SidebarSocialMedia">
        {SidebarSocialMedia.map((val, key) => {
          return (
            <NavLink to={val.url} className="icon" key={key}>
              {val.icon}
            </NavLink>
          );
        })}
      </div>

      <div className="SidebarMenu">
        <Menu />
      </div>
    </div>
  );
}

export default Sidebar;
