import React from 'react';
import { connect } from "react-redux";
import JourneyItem from "./JourneyItem";

const JourneyList = ({ journeys, loading }) => {
    const journeysList = journeys.map(journey => (
        <JourneyItem
            key={journey.id}
            journey={journey}
        />
    ))
    if (loading) return <h1>Loading...</h1>
    return (
        <div>
            {journeysList}
        </div>
    );
};
const mapStateToProps = ({ journeys }) => ({
    journeys,
    loading: !journeys,
});

export default connect(mapStateToProps)(JourneyList);