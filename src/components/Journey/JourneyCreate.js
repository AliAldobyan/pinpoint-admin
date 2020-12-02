import React, { useState } from 'react';
import {connect} from "react-redux";
import JourneyMapCreate from "./JourneyMapCreate";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {addJourney} from "../../redux/actions";
import moment from "moment";
import DriverModal from "../Driver/DriverModal";

const JourneyCreate = ({ shipments, createJourney, journeys }) => {

    const [selectedShipments, setSelectedShipments] = useState([]);
    const [travelTime, setTravelTime] = useState(0)
    const [previousLength, setPreviousLength] = useState(0)
    const [openModal, setOpenModal] = useState(false)

    if (!journeys) return <h1>Loading...</h1>
    if (!shipments) return <h1>Loading...</h1>

    const filteredShipments = shipments.filter(shipment => shipment.status?.id === 2 || shipment.status?.id === 4)

    const handleClick = () => {
        createJourney({packages_list: selectedShipments.map(shipment => shipment.id)})
        setPreviousLength(0)
        setTravelTime(0)
        setSelectedShipments([])
        setOpenModal(true)
    }

    const header = (
        <div className="table-header">
            <p>Travel Time: {travelTime}</p>
            {selectedShipments.length >= 1 && <button className="btn btn-primary" onClick={handleClick}>Create Journey</button>}
        </div>
    );
    const dateBodyTemplate = (rowData) => {
        return (
            <span >
        {moment(rowData.date_added).format("YYYY-MM-DD")}
      </span>
        );
    };

    return (
        <div className="journey">
            <div>
                <DataTable value={filteredShipments} header={header} selection={selectedShipments}
                           onSelectionChange={e => setSelectedShipments(e.value)} selectionMode="multiple" dataKey="id" metaKeySelection={false}
                           scrollable scrollHeight="38vh">
                    <Column field="id" header="ID"/>
                    <Column field="tracking_num" header="Tracking Number"/>
                    <Column field="receiver_name" header="Receiver Name"/>
                    <Column field="receiver_phone" header="Receiver Phone"/>
                    <Column field="date_added" header="Date Added" body={dateBodyTemplate} sortable/>
                    <Column field="added_by.username" header="Added By"/>
                    <Column field="preferred_time.time" header="Preferred Time" sortable/>
                    <Column field="status.name" header="Status"/>
                </DataTable>
            </div>
            <JourneyMapCreate shipments={filteredShipments}
                              selected={selectedShipments} setSelected={setSelectedShipments}
                              travelTime={travelTime} setTravelTime={setTravelTime}
                              previousLength={previousLength} setPreviousLength={setPreviousLength}
            />
            <DriverModal openModal={openModal} setOpenModal={setOpenModal} journey={journeys[0]} key={journeys[0].id} modalHeader={"New journey has been created"}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(JourneyCreate);