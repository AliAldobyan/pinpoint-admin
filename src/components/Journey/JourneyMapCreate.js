import React, { useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import {connect} from "react-redux";

const libraries = ["places"];
const mapContainerStyle = {
    height: "50vh",
    width: "100%",
};
const center = {
    lat: 24.711988,
    lng: 46.663406,
};
const JourneyMap = ({ shipments, selected, setSelected, travelTime, setTravelTime, previousLength, setPreviousLength }) => {

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    useEffect(() => {
        try {
            if (selected.length < previousLength) {
                setPreviousLength(selected.length)
                setTravelTime(0)
                if (selected.length > 1) {
                    let newTravelTime = 0
                    for (let i = 1; i < selected.length; i++) {
                        let originShipment = selected[i - 1]
                        let destinationShipment = selected[i]
                        let origin = new window.google.maps.LatLng(Number(originShipment.latitude), Number(originShipment.longitude));
                        let destination = new window.google.maps.LatLng(Number(destinationShipment.latitude), Number(destinationShipment.longitude))
                        const callback = (response) => {
                            let travel = Math.ceil(response.rows[0].elements[0].duration.value / 60) + 5
                            newTravelTime += travel
                            setTravelTime(newTravelTime)
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
                    let originShipment = selected[selected.length - 2]
                    let destinationShipment = selected[selected.length - 1]
                    let origin = new window.google.maps.LatLng(Number(originShipment.latitude), Number(originShipment.longitude));
                    let destination = new window.google.maps.LatLng(Number(destinationShipment.latitude), Number(destinationShipment.longitude))
                    const callback = (response) => {
                        let travel = Math.ceil(response.rows[0].elements[0].duration.value / 60) + 5
                        setTravelTime(travelTime + travel)
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

    const markers = shipments?.map(shipment => (
        <Marker
            key={shipment.id}
            position={{lat: Number(shipment.latitude), lng: Number(shipment.longitude)}}
            onClick={() => {
                setSelected(selected.some(item => item.id === shipment.id) ? selected.filter(pin => pin.id !== shipment.id) : [...selected, shipment]);
            }}
            icon={selected.some(item => item.id === shipment.id) ? {
                url: `http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${selected.findIndex(obj => obj.id === shipment.id) + 1}|9797ff|000000`,
            }:{
                url: `http://maps.google.com/mapfiles/ms/icons/red-dot.png`,
            }}
        />
    ))

    return (
        <div>
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

export default connect(mapStateToProps)(JourneyMap);