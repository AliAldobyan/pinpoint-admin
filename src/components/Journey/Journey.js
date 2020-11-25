import React from 'react';
import { Link } from "react-router-dom";

const Journey = () => {
    return (
        <div>
            <Link to="/journeys/list/"><h1>list</h1></Link>
            <Link to="/journeys/current/"><h1>Current</h1></Link>
        </div>
    );
};

export default Journey;