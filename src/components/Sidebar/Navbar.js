import React, { useState } from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/actions";
import logo from "./logo.png";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as FiIcons from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";

function Navbar({ user, logout }) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: "#3f4f83" }}>
        {/* <div className="navbar">
          <NavLink to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </NavLink>
        </div> */}
        <nav className={"nav-menu active"}>
          <ul className="nav-menu-items">
            <br />
            <li className="navbar-toggle">
              {/* <h2 className="ml-5">Pinpoint</h2> */}
              <img
                className="py-5"
                src={logo}
                alt=""
                style={{ position: "absolute" }}
              ></img>
            </li>
            {/* <hr className="sidebar-divider my-4" /> */}
            <br />

            {user ? (
              <>
                {" "}
                <li className="nav-text">
                  <NavLink to="/" exact activeClassName="active">
                    <AiIcons.AiFillHome />
                    <span className="span-space">Home</span>
                  </NavLink>
                </li>
                <li className="nav-text">
                  <NavLink to="/shipments/" exact activeClassName="active">
                    <FiIcons.FiBox />
                    <span className="span-space">Shipments</span>
                  </NavLink>
                </li>
                <li className="nav-text">
                  <NavLink to="/journeys/list/" exact activeClassName="active">
                    <FaIcons.FaRoute />
                    <span className="span-space">Journeys</span>
                  </NavLink>
                </li>
                <li className="nav-text">
                  <NavLink to="/drivers/" exact activeClassName="active">
                    <FaIcons.FaCarSide />
                    <span className="span-space">Drivers</span>
                  </NavLink>
                </li>
                <li className="nav-text">
                  <NavLink to="/map/" exact activeClassName="active">
                    <FaIcons.FaMapMarkedAlt />
                    <span className="span-space">Shipments Map</span>
                  </NavLink>
                </li>
                <button className="btn btn-lg btn-info   " onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <li className="nav-text">
                  <NavLink to="/" exact activeClassName="active">
                    <AiIcons.AiFillHome />
                    <span className="span-space">Home</span>
                  </NavLink>
                </li>
                <NavLink to="/login">
                  {" "}
                  <button className="btn  btn-info  btn-lg">Login</button>
                </NavLink>
              </>
            )}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
