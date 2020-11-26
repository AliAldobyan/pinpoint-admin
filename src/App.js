import React from "react";
import "./App.css";
import Navbar from "./components/Sidebar/Navbar";
import { Switch, Route } from "react-router-dom";

import Home from "./components/HomePage/Home";
import Shipments from "./components/Shipments/Shipments";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shipments" component={Shipments} />
      </Switch>
    </>
  );
}

export default App;
