import React from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import {connect} from "react-redux";
import {addJourney} from "../../redux/actions";

const mapContainerStyle = {
    height: "100vh",
    width: "100%",
};
const center = {
    lat: 24.711988,
    lng: 46.663406,
};
const ShipmentsMap = ({ shipments }) => {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });


    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    if (!shipments) return <h1> LOADING...</h1>;

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
    journeys,
    shipments,
    loading: !shipments,
});

const mapDispatchToProps = (dispatch) => {
    return {
        createJourney: (item) => dispatch(addJourney(item)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShipmentsMap);