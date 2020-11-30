import React, { useState } from "react";
import { connect } from "react-redux";
import { logout } from "../../redux/actions";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import { Link } from "react-router-dom";
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
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div> */}
        <nav className={"nav-menu active"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <h2 className="ml-5">Pinpoint</h2>
            </li>

            {user ? (
              <>
                ({" "}
                <li className="nav-text">
                  <Link to="/">
                    <AiIcons.AiFillHome />
                    <span className="span-space">Home</span>
                  </Link>
                </li>
                <li className="nav-text">
                  <Link to="/shipments/">
                    <FaIcons.FaTruck />
                    <span className="span-space">Shipments</span>
                  </Link>
                </li>
                <li className="nav-text">
                  <Link to="/journeys/list/">
                    <FaIcons.FaRoute />
                    <span className="span-space">Journeys</span>
                  </Link>
                </li>
                <li className="nav-text">
                  <Link to="/journeys/list/">
                    <FaIcons.FaRoute />
                    <span className="span-space">Shipments Map</span>
                  </Link>
                </li>
                <button className="btn btn-lg btn-info   " onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <li className="nav-text">
                  <Link to="/">
                    <AiIcons.AiFillHome />
                    <span className="span-space">Home</span>
                  </Link>
                </li>
                <Link to="/login">
                  {" "}
                  <button className="btn  btn-info  btn-lg">Login</button>
                </Link>
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
