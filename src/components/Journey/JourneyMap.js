import React, { useState, useEffect } from 'react';
import axios from "axios";
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
    const [selected, setSelected] = useState([])
    const [travelTime, setTravelTime] = useState(0)
    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    if (!shipments) return <h1> LOADING...</h1>;
    const calculateTime = async () =>{
        try {
            let res = await axios.get("https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=24.766234,46.582030&destinations=24.768533,46.585431&key=AIzaSyDixgXXhDdnbKdqnqrVxJXf3jslKQH5VSY", {headers: {"Access-Control-Allow-Origin": "*"}})
            setTravelTime(travelTime + res.data.rows.elements.duration.value)
        }
        catch (e) {
            console.log(e)
        }
    }
    console.log(selected);
    const markers = shipments?.map(shipment => (
        <Marker
            key={shipment.id}
            position={{lat: Number(shipment.latitude), lng: Number(shipment.longitude)}}
            onClick={() => {
                setSelected(selected.includes(shipment.id) ? selected.filter(pin => pin !== shipment.id) : [...selected, shipment.id]);
                calculateTime()
            }}
            icon={selected.includes(shipment.id)?{
                url: `http://maps.google.com/mapfiles/ms/icons/green-dot.png`,
            }:{
                url: `http://maps.google.com/mapfiles/ms/icons/red-dot.png`,
            }}
        />
    ))
    return (
        <div>
            <h1>{travelTime}</h1>
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={11.5}
                center={center}
                // options={options}
                // onClick={onMapClick}
                // onLoad={onMapLoad}
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

export default connect(mapStateToProps)(JourneyMap);