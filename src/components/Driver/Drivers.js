import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "primeicons/primeicons.css";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { ProgressSpinner } from "primereact/progressspinner";
import "../../index.css";

import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";

import { InputText } from "primereact/inputtext";

import "../Shipments/cutom.css";

const DriversList = ({ drivers, user }) => {
  const [alldrivers, setDrivers] = useState(drivers || null);
  const [selectedDrivers, setSelectedDrivers] = useState(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    setDrivers(drivers);
  }, [drivers]);

  if (!drivers)
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

  const statusBodyTemplate = (rowData) => {
    return (
      <>
        {rowData?.journeys[rowData.journeys?.length - 1].is_completed ===
        false ? (
          <span className={classNames("customer-badge", "status-Failed")}>
            Not Available
          </span>
        ) : (
          <span className={classNames("customer-badge", "status-Delivered")}>
            Available
          </span>
        )}
      </>
    );
  };

  const driverIdBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.id}`}>
        {rowData.id}
      </span>
    );
  };

  const driverBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.driver}`}>
        {`${rowData?.user.first_name} ${rowData?.user.last_name}`}
      </span>
    );
  };

  const phoneBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData}`}>
        {rowData.phone}
      </span>
    );
  };

  const journeysNumBodyTemplate = (rowData) => {
    return (
      <span className={`product-badge status-${rowData}`}>
        {rowData?.journeys.length}
      </span>
    );
  };

  const header = (
    <>
      <div className="table-header">
        <h4 className="p-m-0">Drivers List</h4>

        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
        </span>
      </div>
    </>
  );

  if (!user) return <Redirect to="/login" />;
  return (
    <div className="drivers ui-toolbar-group-left ">
      <div className="datatable-crud-demo">
        <Toast ref={toast} />

        <div className="card">
          <Toolbar className="p-mb-2"></Toolbar>

          <DataTable
            ref={dt}
            value={alldrivers}
            selection={selectedDrivers}
            onSelectionChange={(e) => setSelectedDrivers(e.value)}
            dataKey="id"
            paginator
            rows={25}
            rowsPerPageOptions={[10, 25, 50]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Drivers"
            globalFilter={globalFilter}
            header={header}
          >
            <Column
              field="id"
              header="Driver Id"
              body={driverIdBodyTemplate}
            ></Column>
            <Column
              field="user.last_name"
              header="Driver Name"
              body={driverBodyTemplate}
            ></Column>
            <Column
              field="phone"
              header="Driver Phone"
              body={phoneBodyTemplate}
            ></Column>
            <Column
              field="journeys"
              header="Number of Journeys"
              body={journeysNumBodyTemplate}
            ></Column>

            <Column field="status" header="Status" body={statusBodyTemplate} />
          </DataTable>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = ({ drivers, user }) => ({
  drivers,
  user,
});

export default connect(mapStateToProps)(DriversList);
