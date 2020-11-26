import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "Shipments",
    path: "/shipments",
    icon: <FaIcons.FaTruck />,
    cName: "nav-text",
  },
  {
    title: "Routes",
    path: "/routes",
    icon: <FaIcons.FaRoute />,
    cName: "nav-text",
  },
];
