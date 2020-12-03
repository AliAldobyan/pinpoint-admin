import React, { useState } from "react";
import { connect } from "react-redux";
import JourneyMapCreate from "./JourneyMapCreate";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { addJourney } from "../../redux/actions";
import moment from "moment";
import DriverModal from "../Driver/DriverModal";
import { Toolbar } from "primereact/toolbar";
import { SelectButton } from "primereact/selectbutton";

import CardsSection from "./CardsSection";

const JourneyCreate = ({ shipments, createJourney, journeys }) => {
  const [selectedShipments, setSelectedShipments] = useState([]);
  const [travelTime, setTravelTime] = useState(0);
  const [previousLength, setPreviousLength] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [value2, setValue2] = useState({ value2: null });

  if (!journeys) return <h1>Loading...</h1>;
  if (!shipments) return <h1>Loading...</h1>;

  const filteredShipments = shipments.filter(
    (shipment) => shipment.status?.id === 2 || shipment.status?.id === 4
  );

  const ShipmentsCards = filteredShipments.map((shipment) => (
    <CardsSection key={shipment.id} shipment={shipment} />
  ));
  const handleClick = () => {
    createJourney({
      packages_list: selectedShipments.map((shipment) => shipment.id),
    });
    setPreviousLength(0);
    setTravelTime(0);
    setSelectedShipments([]);
    setOpenModal(true);
  };

  const header = (
    <div className="table-header">
      {selectedShipments.length >= 1 ? (
        <button className="btn btn-primary" style={{}} onClick={handleClick}>
          Create Journey
        </button>
      ) : (
        <button className="btn btn-primary" disabled onClick={handleClick}>
          Create Journey
        </button>
      )}
    </div>
  );

  const dateBodyTemplate = (rowData) => {
    return <span>{moment(rowData.date_added).format("YYYY-MM-DD")}</span>;
  };

  const options = [
    { label: "Apartment", value: "Apartment" },
    { label: "House", value: "House" },
    { label: "Studio", value: "Studio" },
  ];
  return (
    <>
      <div className="journey">
        <SelectButton
          value={value2}
          options={options}
          onChange={(e) => setValue2({ value2: e.value })}
          optionLabel="name"
          multiple
        />

        {/* <p>Selected Values: {value2 && value2.map((val) => val + " ")}</p> */}

        {/* <div className="row">
          <div className="col">
            <JourneyMapCreate
              shipments={filteredShipments}
              selected={selectedShipments}
              setSelected={setSelectedShipments}
              travelTime={travelTime}
              setTravelTime={setTravelTime}
              previousLength={previousLength}
              setPreviousLength={setPreviousLength}
            />
          </div>
          <div className="col">
            <DataTable
              value={filteredShipments}
              selection={selectedShipments}
              onSelectionChange={(e) => setSelectedShipments(e.value)}
              selectionMode="multiple"
              dataKey="id"
              metaKeySelection={false}
              scrollable
              scrollHeight="38vh"
            >
              <Column field="id" header="ID" />
              <Column field="tracking_num" header="Tracking Number" />
              <Column field="receiver_name" header="Receiver Name" />
              <Column field="receiver_phone" header="Receiver Phone" />
              <Column
                field="date_added"
                header="Date Added"
                body={dateBodyTemplate}
                sortable
              />
              <Column field="added_by.username" header="Added By" />
              <Column
                field="preferred_time.time"
                header="Preferred Time"
                sortable
              />
              <Column field="status.name" header="Status" />
            </DataTable>
          </div>
        </div> */}
        <div className="ms-Grid" dir="ltr">
          <div className="ms-Grid-row">
            <Toolbar
              className="p-mb-2"
              left={header}
              style={{
                zIndex: 1000,
                position: "fixed",
                right: 0,
                width: "84%",
                background: "transparent",
                border: "transparent",
              }}
            />

            <div
              className="ms-Grid-col ms-sm7 ms-xl12"
              style={{
                position: "fixed",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              <JourneyMapCreate
                shipments={filteredShipments}
                selected={selectedShipments}
                setSelected={setSelectedShipments}
                travelTime={travelTime}
                setTravelTime={setTravelTime}
                previousLength={previousLength}
                setPreviousLength={setPreviousLength}
              />{" "}
            </div>
            <div
              className="main-element ms-Grid-col ms-sm3 ms-xl4"
              style={{
                position: "absolute",
                top: 100,
                right: 0,
              }}
            >
              <div className="ms-Grid-row">{ShipmentsCards}</div>
              <div className="ms-Grid-row"></div>
            </div>
          </div>
        </div>
      </div>

      <DriverModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        journey={journeys[0]}
        key={journeys[0].id}
        modalHeader={"New journey has been created"}
      />
    </>
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
