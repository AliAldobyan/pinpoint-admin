import React from 'react';
import { Link } from "react-router-dom";

const Journey = () => {
    return (
        <div>
            <Link to="/journeys/list/"><h6>list</h6></Link>
            <Link to="/journeys/current/"><h6>Current</h6></Link>
            <Link to="/journeys/completed/"><h6>Completed</h6></Link>
            <Link to="/journeys/map/"><h6>Map</h6></Link>
        </div>
    );
};

export default Journey;