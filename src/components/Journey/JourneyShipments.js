import React from 'react';
import {connect} from "react-redux";

const JourneyShipments = ({ shipments, shipment }) => {
    return (
        <div>
            <h1>{shipment.id}</h1>
            <p>{shipment.region?.name}</p>
        </div>
    );
};

const mapStateToProps = ({ shipments }) => ({
    shipments,
    loading: !shipments.length,
});

export default connect(mapStateToProps)(JourneyShipments);