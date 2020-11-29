import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow, DistanceMatrixService } from "@react-google-maps/api";
import {connect} from "react-redux";
import {addJourney} from "../../redux/actions";
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
const JourneyMap = ({ shipments, createJourney }) => {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [selected, setSelected] = useState([])
    const [travelTime, setTravelTime] = useState(0)
    const [previousLength, setPreviousLength] = useState(0)

    useEffect(() => {
        try {
            if (selected.length < previousLength) {
                setPreviousLength(selected.length)
                setTravelTime(0)
                if (selected.length > 1) {
                    let newTravelTime = 0
                    for (let i = 1; i < selected.length; i++) {
                        let originShipment = shipments.find(shipment => shipment.id === selected[i - 1])
                        let destinationShipment = shipments.find(shipment => shipment.id === selected[i])
                        let origin = new window.google.maps.LatLng(Number(originShipment.latitude), Number(originShipment.longitude));
                        let destination = new window.google.maps.LatLng(Number(destinationShipment.latitude), Number(originShipment.longitude))
                        const callback = (response) => {
                            console.log(response)
                            let travel = Math.ceil(response.rows[0].elements[0].duration.value / 60) + 5
                            newTravelTime += travel
                            setTravelTime(newTravelTime)
                            console.log(travelTime)
                        }
                        let service = new window.google.maps.DistanceMatrixService();
                        service.getDistanceMatrix(
                            {
                                origins: [origin],
                                destinations: [destination],
                                travelMode: 'DRIVING',
                            }, callback);
                    }
                }

            }
            else {
                setPreviousLength(selected.length)
                if (selected.length > 1) {
                    let originShipment = shipments.find(shipment => shipment.id === selected[selected.length - 2])
                    let destinationShipment = shipments.find(shipment => shipment.id === selected[selected.length - 1])
                    let origin = new window.google.maps.LatLng(Number(originShipment.latitude), Number(originShipment.longitude));
                    let destination = new window.google.maps.LatLng(Number(destinationShipment.latitude), Number(originShipment.longitude))
                    const callback = (response) => {
                        console.log(response)
                        let travel = Math.ceil(response.rows[0].elements[0].duration.value / 60) + 5
                        setTravelTime(travelTime + travel)
                        console.log(travelTime)
                    }
                    let service = new window.google.maps.DistanceMatrixService();
                    service.getDistanceMatrix(
                        {
                            origins: [origin],
                            destinations: [destination],
                            travelMode: 'DRIVING',
                        }, callback);
                }
            }
        }
        catch (e) {
            console.log(e)
        }

    }, [selected]);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";
    if (!shipments) return <h1> LOADING...</h1>;

    const handleClick = () => {
        createJourney({packages_list: selected})
        setPreviousLength(0)
        setTravelTime(0)
        setSelected([])
    }

    const markers = shipments?.map(shipment => (
        <Marker
            key={shipment.id}
            position={{lat: Number(shipment.latitude), lng: Number(shipment.longitude)}}
            onClick={() => {
                setSelected(selected.includes(shipment.id) ? selected.filter(pin => pin !== shipment.id) : [...selected, shipment.id]);
            }}
            icon={selected.includes(shipment.id)?{
                url: `http://maps.google.com/mapfiles/ms/icons/green-dot.png`,
            }:{
                url: `http://maps.google.com/mapfiles/ms/icons/red-dot.png`,
            }}
        />
    ))
    console.log(selected)
    return (
        <div>
            <h1>Travel Time: {travelTime}</h1>
            {selected.length > 1 && <button className="btn btn-primary" onClick={handleClick}>Create Journey</button>}
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

const mapStateToProps = ({ journeys }) => ({
    journeys,
});

const mapDispatchToProps = (dispatch) => {
    return {
        createJourney: (item) => dispatch(addJourney(item)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JourneyMap);