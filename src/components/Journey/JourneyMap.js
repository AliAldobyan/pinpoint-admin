import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import {connect} from "react-redux";
// import "@reach/combobox/styles.css";

const libraries = ["places"];
const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
};
const center = {
    lat: 24.711988,
    lng: 46.663406,
};
const JourneyMap = ({ shipments, loading }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    const [markers, setMarkers] = useState(shipments || []);
    useEffect( () => {
        setMarkers(shipments)
    }, [shipments])
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    if (!shipments) return <h1> LOADING...</h1>;
    console.log(markers);
    return (
        <div>
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={11.5}
                center={center}
                // options={options}
                // onClick={onMapClick}
                // onLoad={onMapLoad}
            >
                {markers?.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={{ lat: Number(marker.latitude), lng: Number(marker.longitude) }}
                        // onClick={() => {
                        //     setSelected(marker);
                        // }}
                        // icon={{
                        //     url: `/bear.svg`,
                        //     origin: new window.google.maps.Point(0, 0),
                        //     anchor: new window.google.maps.Point(15, 15),
                        //     scaledSize: new window.google.maps.Size(30, 30),
                        // }}
                    />
                ))}
            </GoogleMap>
        </div>
    );
};
const mapStateToProps = ({ journeys, shipments }) => ({
    journeys,
    shipments,
    loading: !shipments,
});

export default connect(mapStateToProps)(JourneyMap);