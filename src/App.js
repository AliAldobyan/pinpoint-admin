import React from "react";
import "./App.css";

import Navbar from "./components/Sidebar/Navbar";

import { Switch, Route } from "react-router-dom";

import Home from "./components/HomePage/Home";
import Shipments from "./components/Shipments/Shipments";
import Login from "./components/Authentication/Login";
import JourneyList from "./components/Journey/JourneyList";
import JourneyCreate from "./components/Journey/JourneyCreate";
import ShipmentsMap from "./components/Shipments/ShipmentsMap";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/login/" component={Login} />
        <Route path="/" exact component={Home} />
        <Route path="/shipments/" component={Shipments} />
        <Route path="/journeys/list/" component={JourneyList} />
        <Route path="/journeys/create/" component={JourneyCreate} />
        <Route path="/map/" component={ShipmentsMap} />
      </Switch>

    </>
  );
}

export default App;
