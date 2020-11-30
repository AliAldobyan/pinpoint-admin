import React, { useState } from 'react';
import {connect} from "react-redux";
import JourneyMapCreate from "./JourneyMapCreate";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {addJourney} from "../../redux/actions";
import {InputText} from "primereact/inputtext";
import moment from "moment";

const JourneyCreate = ({ shipments, createJourney }) => {

    const [selectedShipments, setSelectedShipments] = useState([]);
    const [travelTime, setTravelTime] = useState(0)
    const [previousLength, setPreviousLength] = useState(0)

    if (!shipments) return <h1>Loading...</h1>

    const filteredShipments = shipments.filter(shipment => shipment.status?.id === 1 || shipment.status?.id === 4)

    const handleClick = () => {
        createJourney({packages_list: selectedShipments.map(shipment => shipment.id)})
        setPreviousLength(0)
        setTravelTime(0)
        setSelectedShipments([])
    }

    const header = (
        <div className="table-header">
            <p>Travel Time: {travelTime}</p>
            {/*{selectedShipments.length >= 1 && <button className="btn btn-primary" onClick={handleClick}>Create Journey</button>}*/}

      {/*      <h5 className="p-m-0">Manage Shipments</h5>*/}
      {/*      <span className="p-input-icon-left">*/}
      {/*  <i className="pi pi-search" />*/}
      {/*  <InputText*/}
      {/*      type="search"*/}
      {/*      onInput={(e) => {}}*/}
      {/*      placeholder="Search..."*/}
      {/*  />*/}
      {/*</span>*/}
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
                {/*<h1>Travel Time: {travelTime}</h1>*/}
                {/*{selectedShipments.length > 1 && <button className="btn btn-primary" onClick={handleClick}>Create Journey</button>}*/}
            <div>
                <DataTable value={filteredShipments} header={header} selection={selectedShipments}
                           onSelectionChange={e => setSelectedShipments(e.value)} selectionMode="multiple" dataKey="id" metaKeySelection={false}
                           scrollable scrollHeight="38vh">
                    <Column field="id" header="ID"/>
                    <Column field="tracking_num" header="Tracking Number"/>
                    <Column field="receiver_name" header="Receiver Name"/>
                    <Column field="receiver_phone" header="Quantity"/>
                    <Column field="date_added" header="Quantity" body={dateBodyTemplate} sortable/>
                    <Column field="added_by.first_name" header="Quantity"/>
                    <Column field="preferred_time.time" header="Quantity"/>
                    <Column field="status.name" header="Quantity"/>
                    {/*<Column field="date_added" header="Quantity"/>*/}
                </DataTable>
            </div>
            <JourneyMapCreate shipments={filteredShipments}
                              selected={selectedShipments} setSelected={setSelectedShipments}
                              travelTime={travelTime} setTravelTime={setTravelTime}
                              previousLength={previousLength} setPreviousLength={setPreviousLength}
            />

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