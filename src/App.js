import React from "react";
import "./App.css";

import Navbar from "./components/Sidebar/Navbar";

import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./components/HomePage/Home";
import Shipments from "./components/Shipments/Shipments";
import Journey from "./components/Journey/Journey";
import JourneyList from "./components/Journey/JourneyList";
import JourneyCurrent from "./components/Journey/JourneyCurrent";
import JourneyCompleted from "./components/Journey/JourneyCompleted";
import JourneyMap from "./components/Journey/JourneyMap";
import JourneyCreate from "./components/Journey/JourneyCreate";

function App() {
  return (
    <>
      {/*<Navbar />*/}
      {/*<Switch>*/}
      {/*  <Route path="/" exact component={Home} />*/}
      {/*  <Route path="/shipments" component={Shipments} />*/}
      {/*</Switch>*/}

        <Journey/>
        <Switch>
            <Route path="/journeys/list/">
                <JourneyList/>
            </Route>
            <Route path="/journeys/current/">
                <JourneyCurrent/>
            </Route>
            <Route path="/journeys/completed/">
                <JourneyCompleted/>
            </Route>
            <Route path="/journeys/map/">
                <JourneyMap/>
            </Route>
            <Route path="/journeys/create/">
                <JourneyCreate/>
            </Route>
        </Switch>
    </>
  );
}

export default App;
