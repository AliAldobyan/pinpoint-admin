import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import "primeicons/primeicons.css";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { ProgressBar } from "primereact/progressbar";
import "../../index.css";

import moment from "moment";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { Toolbar } from "primereact/toolbar";

import { InputText } from "primereact/inputtext";

import "../Shipments/cutom.css";
import DriverModal from "../Driver/DriverModal";
const JourneyList = ({ journeys, user }) => {
  const [allJourneys, setJourneys] = useState(journeys || null);

  const [journey, setJourney] = useState(null);
  const [selectedJourneys, setSelectedJourneys] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [openModal, setOpenModal] = useState(false)
  const [journeyToAssign, setJourneyToAssign] = useState(null)
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  //   const statusesOptions = statuses?.map((status) => status.name);
  //   const regionsOptions = regions?.map((region) => region.name);
  //   const timeOptions = times?.map((time) => time.time);

  useEffect(() => {
    setJourneys(journeys);
    // fetchRegions();
    // fetchTimes();
  }, [journeys]);

  const handleAssignClick = (rowData) => {
    setJourneyToAssign(rowData)
    setOpenModal(true)
  }

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
          <span className={classNames("customer-badge", "status-failed")}>
            not completed
          </span>
        ) : (
          <span className={classNames("customer-badge", "status-Delivered")}>
            completed
          </span>
        )}
      </>
    );
  };
  //   const renderStatusFilter = () => {
  //     return (
  //       <MultiSelect
  //         value={selectedStatus}
  //         options={statusesOptions}
  //         onChange={onStatusFilterChange}
  //         itemTemplate={statusItemTemplate}
  //         filterBy={selectedStatus}
  //         placeholder="Select a Status"
  //       />
  //     );
  //   };
  const statusItemTemplate = (option) => {
    return (
      <span className={classNames("customer-badge", "status-" + option)}>
        {option}
      </span>
    );
  };
  const onStatusFilterChange = (event) => {
    dt.current.filter(event.value, "status.name", "in");

    setSelectedStatus(event.value);
  };
  const regionBodyTemplate = (rowData) => {
    return (
      <span className={`order-badge status-${rowData}`}>
        {rowData.region?.name}
      </span>
    );
  };
  //   const renderRegionFilter = () => {
  //     return (
  //       <Dropdown
  //         value={selectedRegion}
  //         options={regionsOptions}
  //         onChange={onRegionFilterChange}
  //         itemTemplate={regionItemTemplate}
  //         showClear
  //         placeholder="Select a Region"
  //       />
  //     );
  //   };
  const regionItemTemplate = (option) => {
    return (
      <span className={classNames("customer-badge", "status-" + option)}>
        {option}
      </span>
    );
  };
  const onRegionFilterChange = (event) => {
    dt.current.filter(event.value, "region.name", "equals");

    setSelectedRegion(event.value);
  };

  const journeyIdBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.id}`}>
        {rowData.id}
      </span>
    );
  };
  const y = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.tracking_num}`}>
        {rowData.tracking_num}
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
          <button className="btn btn-primary" onClick={() => handleAssignClick(rowData)}>Assign Driver</button>
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
        {rowData.distance_traveled}
      </span>
    );
  };
  const timeBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData}`}>
        {rowData.time_traveled}
      </span>
    );
  };
  //   const renderTimeFilter = () => {
  //     return (
  //       <MultiSelect
  //         value={selectedTime}
  //         options={timeOptions}
  //         onChange={onTimeFilterChange}
  //         itemTemplate={timeItemTemplate}
  //         filterBy={selectedTime}
  //         placeholder="Select Time"
  //       />
  //     );
  //   };
  const timeItemTemplate = (option) => {
    return (
      <span className={classNames("customer-badge", "status-" + option)}>
        {option}
      </span>
    );
  };
  const onTimeFilterChange = (event) => {
    dt.current.filter(event.value, "preferred_time.time", "in");

    setSelectedTime(event.value);
  };
  const displayValueTemplate = (value) => {
    return (
      <React.Fragment>
        {value}/<b>10</b>
      </React.Fragment>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <>
        {rowData.is_completed === true ? (
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "100%" }}
              aria-valuenow="100"
              aria-valuemin="0"
              aria-valuemax="10"
            >
              10/10
            </div>
          </div>
        ) : (
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{ width: "50%" }}
              aria-valuenow="50"
              aria-valuemin="0"
              aria-valuemax="10"
            >
              5/10
            </div>
          </div>
        )}
      </>
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Journeys List</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  console.log(allJourneys);

  //   const statusFilterElement = renderStatusFilter();
  //   const regionFilterElement = renderRegionFilter();
  //   const timeFilterElement = renderTimeFilter();
  if (!user) return <Redirect to="/login" />;
  return (
    <div className="journeyslist ui-toolbar-group-left ">
      <DriverModal openModal={openModal} setOpenModal={setOpenModal} journey={journeyToAssign} key={journeyToAssign?.id}/>
      <div className="datatable-crud-demo">
        <Toast ref={toast} />

        <div className="card">
          <Toolbar className="p-mb-2" right={leftToolbarTemplate}></Toolbar>

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
            ></Column>
            <Column
              field="driver.user.first_name"
              header="Driver"
              body={driverBodyTemplate}
            ></Column>
            {/* <Column field="receiver_phone" header="Customer Phone"  ></Column> */}
            <Column
              field="date"
              header="Delivery Date"
              body={dateBodyTemplate}
              sortable
            ></Column>
            <Column
              field="distance_traveled"
              header="Distance Traveled"
              body={distanceBodyTemplate}
              //   filter
              //   filterElement={timeFilterElement}
            ></Column>
            <Column
              field="time_traveled"
              header="Time Traveled"
              body={timeBodyTemplate}
            ></Column>
            <Column
              field="status"
              header="Status"
              body={statusBodyTemplate}
              //   filter
              //   filterElement={statusFilterElement}
            />
            {/*<Column
              field="region.name"
              header="Region"
              body={regionBodyTemplate}
              //   filter
              //   filterElement={regionFilterElement}
            ></Column>

            <Column
              field="status.name"
              header="Status"
              body={statusBodyTemplate}
              //   filter
              //   filterElement={statusFilterElement}
            /> */}

            <Column header="Progress" body={actionBodyTemplate}></Column>
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
