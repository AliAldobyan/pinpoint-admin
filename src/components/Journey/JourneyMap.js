import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import {connect} from "react-redux";

const mapContainerStyle = {
    height: "40vh",
    width: "100%",
};
const center = {
    lat: 24.711988,
    lng: 46.663406,
};

const JourneyMap = ({ shipments, journeys }) => {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });


    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    if (!journeys) return <h1> LOADING...</h1>;

    const markers = shipments?.map(shipment => (
        <Marker
            key={shipment.id}
            position={{lat: Number(shipment.latitude), lng: Number(shipment.longitude)}}
            icon={{url: `http://maps.google.com/mapfiles/ms/icons/red-dot.png`,}}
        />
    ))

    return (
        <div className="journey">
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={11.5}
                center={center}
            >
                {markers}
            </GoogleMap>
        </div>
    );
};

const mapStateToProps = ({ journeys, shipments }) => ({
    shipments,
    journeys,
});

export default connect(mapStateToProps)(JourneyMap);