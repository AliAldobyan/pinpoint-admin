import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
// import "@reach/combobox/styles.css";

const libraries = ["places"];
const mapContainerStyle = {
    height: "50vh",
    width: "50vw",
};
const center = {
    lat: 24.711988,
    lng: 46.663406,
};
const JourneyMap = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    return (
        <div>
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={11}
                center={center}
                // options={options}
                // onClick={onMapClick}
                // onLoad={onMapLoad}
            >
            </GoogleMap>
        </div>
    );
};

export default JourneyMap;