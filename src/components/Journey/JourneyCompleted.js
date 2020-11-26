import React from 'react';
import JourneyItem from "./JourneyItem";
import {connect} from "react-redux";

const JourneyCompleted = ({ journeys }) => {
    const journeysList = journeys.map(journey => {
        if (journey.is_completed) {
            return (
                <JourneyItem
                    key={journey.id}
                    journey={journey}
                />
            )
        } else
            return null
    })
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

export default connect(mapStateToProps)(JourneyCompleted);