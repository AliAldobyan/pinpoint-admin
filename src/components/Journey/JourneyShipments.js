import React from 'react';
import {connect} from "react-redux";

const JourneyShipments = ({ shipments }) => {
    return (
        <div>

        </div>
    );
};

const mapStateToProps = ({ shipments }) => ({
    shipments,
    loading: !shipments.length,
});

export default connect(mapStateToProps)(JourneyShipments);