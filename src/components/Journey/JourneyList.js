import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "primeicons/primeicons.css";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { ProgressSpinner } from "primereact/progressspinner";
import "../../index.css";

import moment from "moment";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { Toolbar } from "primereact/toolbar";

import { InputText } from "primereact/inputtext";

import "../Shipments/cutom.css";
import DriverModal from "../Driver/DriverModal";
const JourneyList = ({ journeys, user }) => {
  const [allJourneys, setJourneys] = useState(journeys || null);
  const [selectedJourneys, setSelectedJourneys] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [journeyToAssign, setJourneyToAssign] = useState(null);
  const [checked, setChecked] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    setJourneys(journeys);
  }, [journeys]);

  useEffect(() => {
    if (checked) {
      const filtered = allJourneys.filter(
        (journey) => journey.is_completed === false
      );
      setJourneys(filtered);
    } else {
      setJourneys(journeys);
    }
  }, [checked]);

  const handleAssignClick = (rowData) => {
    setJourneyToAssign(rowData);
    setOpenModal(true);
  };

  if (!journeys)
    return (
      <div className="loader mt-5">
        <ProgressSpinner
          style={{ width: "200px", height: "200px" }}
          strokeWidth="8"
          fill="#EEEEEE"
          animationDuration=".5s"
        />
      </div>
    );

  const random = () => Math.floor(Math.random() * (25 - 5) ) + 5

  const leftToolbarTemplate = () => {
    return (
      <Link to="/journeys/create/">
        <Button
          label="New journey"
          icon="pi pi-plus"
          className="p-button-success"
        />
      </Link>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <>
        {rowData.is_completed === false ? (
          <span className={classNames("customer-badge", "status-Pending")}>
            Active
          </span>
        ) : (
          <span className={classNames("customer-badge", "status-Delivered")}>
            completed
          </span>
        )}
      </>
    );
  };

  const journeyIdBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.id}`}>
        {rowData.id}
      </span>
    );
  };

  const driverBodyTemplate = (rowData) => {
    return (
      <>
        {rowData.driver?.user.first_name ? (
          <span className={`customer-badge status-${rowData.driver}`}>
            {`${rowData.driver?.user.first_name} ${rowData.driver?.user.last_name}`}
          </span>
        ) : (
          <button
            className="btn btn-primary"
            onClick={() => handleAssignClick(rowData)}
          >
            Assign Driver
          </button>
        )}
      </>
    );
  };

  const dateBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData}`}>
        {moment(rowData.date).format("YYYY-MM-DD")}
      </span>
    );
  };

  const distanceBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData}`}>
        {rowData.distance_traveled && `${rowData.distance_traveled} km`}
      </span>
    );
  };

  const timeBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData}`}>
        {rowData.time_traveled && `${rowData.time_traveled} min`}
      </span>
    );
  };

  const actionBodyTemplate = (rowData) => {
    let counter = 0;
    const randomInside = random()
    const len = rowData?.packages.length;

    rowData?.packages.forEach((p) => {
      if (p.status?.id === 4 || p.status?.id === 5) {
        counter++;
      }
    });

    return (
      <>
        {rowData.is_completed === true ? (
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `100%` }}
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax={len}
            >
              {len}/{len}
            </div>
          </div>
        ) :
            (
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: `${len ===0 ? ((randomInside-4)/randomInside*100) : (counter / len) * 100}%` }}
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax={len}
            >
              {counter}/{len}
            </div>
          </div>
        )}
      </>
    );
  };

  const handleClick = (e) => {
    setChecked(e.value);
  };

  const header = (
    <>
      <div className="table-header">
        <h4 className="p-m-0">Journeys List</h4>

        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
        </span>
      </div>

      <div className=" d-flex align-self-center ">
        <h5 className="align-self-baseline mr-3">Only Active Journeys?</h5>
        <InputSwitch checked={checked} onChange={handleClick} />
      </div>
    </>
  );

  if (!user) return <Redirect to="/login" />;
  return (
    <div className="journeyslist ui-toolbar-group-left ">
      <DriverModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        journey={journeyToAssign}
        key={journeyToAssign?.id}
        modalHeader={`Assign a driver to journey`}
      />
      <div className="datatable-crud-demo">
        <Toast ref={toast} />

        <div className="card">
          <Toolbar className="p-mb-2" right={leftToolbarTemplate}/>

          <DataTable
            ref={dt}
            value={allJourneys}
            selection={selectedJourneys}
            onSelectionChange={(e) => setSelectedJourneys(e.value)}
            dataKey="id"
            paginator
            rows={25}
            rowsPerPageOptions={[10, 25, 50]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Journeys"
            globalFilter={globalFilter}
            header={header}
          >
            <Column
                field="id"
                header="Journey Id"
                body={journeyIdBodyTemplate}
                />
            <Column
                field="driver.user.last_name"
                header="Driver"
                body={driverBodyTemplate}
                />

            <Column
                field="date"
                header="Delivery Date"
                body={dateBodyTemplate}
                sortable
                />
            <Column
                field="distance_traveled"
                header="Distance Traveled"
                body={distanceBodyTemplate}
                />
            <Column
                field="time_traveled"
                header="Time Traveled"
                body={timeBodyTemplate}
                />
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
            />

            <Column header="Progress" body={actionBodyTemplate}/>
          </DataTable>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ journeys, user }) => ({
  journeys,
  user,
});

export default connect(mapStateToProps)(JourneyList);
