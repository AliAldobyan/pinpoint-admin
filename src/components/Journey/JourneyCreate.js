import React from 'react';
import {connect} from "react-redux";
import JourneyShipments from "./JourneyShipments";
import JourneyMap from "./JourneyMap";
import JourneyMapCreate from "./JourneyMapCreate";

const JourneyCreate = ({ shipments }) => {
    const filteredShipments = shipments.filter(shipment => shipment.status?.id === 1 || shipment.status?.id === 4)
    const waitingShipments = filteredShipments.map(shipment => (
        <JourneyShipments
            key={shipment.id}
            shipment={shipment}
        />
    ))
    return (
        <div>
            {waitingShipments}
            <JourneyMapCreate shipments={filteredShipments}/>
        </div>
    );
};

const mapStateToProps = ({ journeys, shipments }) => ({
    journeys,
    shipments,
    loading: !shipments,
});

export default connect(mapStateToProps)(JourneyCreate);