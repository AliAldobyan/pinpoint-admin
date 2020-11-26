import "./App.css";
import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// component
import Sidebar from "./components/Sidebar/Sidebar.js";
import Shipments from "./components/Shipments/Shipments";
import Journey from "./components/Journey/Journey";
import JourneyList from "./components/Journey/JourneyList";
import JourneyCurrent from "./components/Journey/JourneyCurrent";
import JourneyCompleted from "./components/Journey/JourneyCompleted";

function App() {
  return (
    <>
      {/*<Sidebar />*/}
      {/*<div className="container mt-5">*/}
      {/*  <Shipments />*/}
      {/*</div>*/}
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
        </Switch>
    </>
  );
}

export default App;
