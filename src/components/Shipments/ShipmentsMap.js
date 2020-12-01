import React from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
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
const ShipmentsMap = ({ shipments, createJourney }) => {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    });


    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    if (!shipments) return <h1> LOADING...</h1>;

    // const handleClick = () => {
    //     createJourney({packages_list: selected})
    //     setPreviousLength(0)
    //     setTravelTime(0)
    //     setSelected([])
    // }

    const markers = shipments?.map(shipment => (
        <Marker
            key={shipment.id}
            position={{lat: Number(shipment.latitude), lng: Number(shipment.longitude)}}
            // onClick={() => {
            //     setSelected(selected.includes(shipment.id) ? selected.filter(pin => pin !== shipment.id) : [...selected, shipment.id]);
            // }}
            // icon={selected.includes(shipment.id)?{
            //     url: `http://maps.google.com/mapfiles/ms/icons/green-dot.png`,
            // }:{
            //     url: `http://maps.google.com/mapfiles/ms/icons/red-dot.png`,
            // }}
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