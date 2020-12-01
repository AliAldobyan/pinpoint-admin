import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { assignDriver } from "../../redux/actions";
import {connect} from "react-redux";
import {GMap} from "primereact/gmap";
import DriversList from "./DriversList";

const DriverModal = ({ journey, drivers, openModal, setOpenModal, driverAssign }) => {
    const [selectedDriver, setSelectedDriver] = useState(null);

    const onHide = () => {
        setOpenModal(false)
    }

    const handleClick = () => {
        driverAssign({
            id: journey.id,
            driver: selectedDriver.id
        })
        setSelectedDriver(null)
        onHide()
    }

    const header = (
        <div>
            <h4>New journey has been created</h4>
        </div>
    )

    const footer = (
        <div>
            <Button label="Assign Later" icon="pi pi-times" onClick={() => onHide()} className="p-button-text" />
            {selectedDriver ? <Button label="Assign Driver" icon="pi pi-check" onClick={handleClick} autoFocus/> :
                <Button label="Assign Driver" icon="pi pi-check" onClick={handleClick} autoFocus disabled/>}
        </div>
    )

    const options = {
        center: { lat: 24.7136, lng: 46.6753 },
        zoom: 11,
    };
    if (!drivers) return <h1>Loading...</h1>
    const availableDrivers = drivers.filter(driver => driver.journeys[driver.journeys?.length - 1].is_completed === true)
    console.log(journey);
    console.log(drivers);
    const overlays = journey?.packages?.map(shipment =>
        new window.google.maps.Marker({
            position: {
                lat: Number(shipment.latitude),
                lng: Number(shipment.longitude),
            },
            icon: {url: `http://maps.google.com/mapfiles/ms/icons/red-dot.png`,}
        })
    )

    return (
        <div>
            {/*<Button label="Show" onClick={() => onClick()} />*/}
            <Dialog header={header} visible={openModal} style={{ width: '50vw' }} footer={footer} onHide={() => onHide()}>
                <GMap
                    options={options}
                    style={{ width: "100%", minHeight: "320px" }}
                    overlays={overlays}
                />
                <h6 className="pt-5 pb-2">Assign a driver for this journey:</h6>
                <DriversList drivers={availableDrivers} selectedDriver={selectedDriver} setSelectedDriver={setSelectedDriver} />
            </Dialog>
        </div>
    );
};

const mapStateToProps = ({ journeys, drivers }) => ({
    journeys,
    drivers,
    loading: !drivers,
});

const mapDispatchToProps = (dispatch) => {
    return {
        driverAssign: (item) => dispatch(assignDriver(item)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DriverModal);
