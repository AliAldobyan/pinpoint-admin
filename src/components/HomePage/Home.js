import React from "react";
import { connect } from "react-redux";
import "./custom.css";
import { Redirect } from "react-router-dom";
import homePage from "./Pinpoint-home3.png";
const Home = ({ user }) => {
  if (!user) return <Redirect to="/login" />;
  return <img src={homePage} alt=""></img>;
};
const mapStateToProps = ({ user }) => ({ user });
export default connect(mapStateToProps)(Home);
