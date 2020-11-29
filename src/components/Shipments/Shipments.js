import React, { useState, useEffect, useRef } from "react";
import { Redirect } from "react-router-dom";
import "primeicons/primeicons.css";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { ProgressSpinner } from "primereact/progressspinner";
import "../../index.css";

import { connect } from "react-redux";
import { fetchRegions, fetchTimes, addShipment } from "../../redux/actions";

import moment from "moment";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { GMap } from "primereact/gmap";
import "./cutom.css";

const Shipments = ({
  shipments,
  statuses,
  fetchRegions,
  regions,
  fetchTimes,
  times,
  addShipment,
  user,
}) => {
  let emptyProduct = {
    tracking_num: "",
    receiver_name: "",
    receiver_phone: "",
  };

  const [allshipments, setShipments] = useState(shipments || null);
  const [shipmentDialog, setShipmentDialog] = useState(false);
  const [shipmentDetailDialog, setShipmentDetailDialog] = useState(false);

  const [shipment, setShipment] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const statusesOptions = statuses?.map((status) => status.name);
  const regionsOptions = regions?.map((region) => region.name);
  const timeOptions = times?.map((time) => time.time);
  const google = window.google;

  const options = {
    center: { lat: 24.7136, lng: 46.6753 },
    zoom: 11,
  };

  const overlays = [
    new google.maps.Marker({
      position: {
        lat: parseFloat(shipment.latitude),
        lng: parseFloat(shipment.longitude),
      },
    }),
  ];
  useEffect(() => {
    setShipments(shipments);
    fetchRegions();
    fetchTimes();
  }, [shipments]);

  if (!shipments)
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
  const openNew = () => {
    setShipment(emptyProduct);
    setSubmitted(false);
    setShipmentDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setShipmentDialog(false);
  };
  const hideDetailDialog = () => {
    setShipmentDetailDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    toast.current.show({
      severity: "success",
      summary: "Successful",
      detail: "Shipment Added",
      life: 3000,
    });

    // setShipments(_allshipments);
    setShipmentDialog(false);
    setShipment(emptyProduct);
    // addShipment({
    //   tracking_num: "12",
    //   receiver_name: "ali",
    //   receiver_phone: "05878",
    //   added_by: "su",
    // });
  };

  const editProduct = (shipment) => {
    setShipment({ ...shipment });
    setShipmentDetailDialog(true);
  };

  const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < allshipments.length; i++) {
      if (allshipments[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  };

  const createId = () => {
    let id = "";
    let chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const onCategoryChange = (e) => {
    let _shipment = { ...shipment };
    _shipment["status"] = e.value;
    setShipment(_shipment);
  };

  const onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let _shipment = { ...shipment };
    _shipment[`${name}`] = val;

    setShipment(_shipment);
  };

  const onInputNumberChange = (e, name) => {
    const val = e.value || 0;
    let _shipment = { ...shipment };
    _shipment[`${name}`] = val;

    setShipment(_shipment);
  };

  const leftToolbarTemplate = () => {
    return (
      <Button
        label="New shipment"
        icon="pi pi-plus"
        className="p-button-success"
        onClick={openNew}
      />
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <span
        className={classNames(
          "customer-badge",
          "status-" + rowData.status.name
        )}
      >
        {rowData.status.name}
      </span>
    );
  };
  const renderStatusFilter = () => {
    return (
      <MultiSelect
        value={selectedStatus}
        options={statusesOptions}
        onChange={onStatusFilterChange}
        itemTemplate={statusItemTemplate}
        filterBy={selectedStatus}
        placeholder="Select a Status"
      />
    );
  };
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
  const renderRegionFilter = () => {
    return (
      <Dropdown
        value={selectedRegion}
        options={regionsOptions}
        onChange={onRegionFilterChange}
        itemTemplate={regionItemTemplate}
        showClear
        placeholder="Select a Region"
      />
    );
  };
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

  const journeyBodyTemplate = (rowData) => {
    return (
      <span className={`journy-badge status-${rowData.journey}`}>
        {rowData.journey}
      </span>
    );
  };
  const trackinNumberBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.tracking_num}`}>
        {rowData.tracking_num}
      </span>
    );
  };
  const customerBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData.receiver_name}`}>
        {rowData.receiver_name}
      </span>
    );
  };

  const dateBodyTemplate = (rowData) => {
    return (
      <span className={`customer-badge status-${rowData}`}>
        {moment(rowData.date_added).format("YYYY-MM-DD")}
      </span>
    );
  };
  const timeBodyTemplate = (rowData) => {
    return (
      <span className={`product-badge status-${rowData}`}>
        {rowData.preferred_time?.time}
      </span>
    );
  };
  const renderTimeFilter = () => {
    return (
      <MultiSelect
        value={selectedTime}
        options={timeOptions}
        onChange={onTimeFilterChange}
        itemTemplate={timeItemTemplate}
        filterBy={selectedTime}
        placeholder="Select Time"
      />
    );
  };
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

  const actionBodyTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-file-o "
        className="p-button-rounded p-button-success p-ml-2"
        onClick={() => editProduct(rowData)}
      />
    );
  };

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Manage Shipments</h5>
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
  const shipmentDialogFooter = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={hideDialog}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        className="p-button-text"
        onClick={saveProduct}
      />
    </>
  );

  console.log(allshipments);

  const statusFilterElement = renderStatusFilter();
  const regionFilterElement = renderRegionFilter();
  const timeFilterElement = renderTimeFilter();
  if (!user) return <Redirect to="/login" />;
  return (
    <div className="shipments ui-toolbar-group-left ">
      <div className="datatable-crud-demo">
        <Toast ref={toast} />

        <div className="card">
          <Toolbar className="p-mb-2" right={leftToolbarTemplate}></Toolbar>

          <DataTable
            ref={dt}
            value={allshipments}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            paginator
            rows={25}
            rowsPerPageOptions={[10, 25, 50]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Shipments"
            globalFilter={globalFilter}
            header={header}
          >
            <Column
              field="tracking_num"
              header="Tracking Number"
              body={trackinNumberBodyTemplate}
            ></Column>
            <Column
              field="receiver_name"
              header="Customer Name"
              body={customerBodyTemplate}
            ></Column>
            {/* <Column field="receiver_phone" header="Customer Phone"  ></Column> */}
            <Column
              field="date_added"
              header="Delivery Date"
              body={dateBodyTemplate}
              sortable
            ></Column>
            <Column
              field="preferred_time.time"
              header="Preferred Time"
              body={timeBodyTemplate}
              filter
              filterElement={timeFilterElement}
            ></Column>
            <Column
              field="journey"
              header="Journey"
              body={journeyBodyTemplate}
              sortable
            ></Column>
            <Column
              field="region.name"
              header="Region"
              body={regionBodyTemplate}
              filter
              filterElement={regionFilterElement}
            ></Column>

            <Column
              field="status.name"
              header="Status"
              body={statusBodyTemplate}
              filter
              filterElement={statusFilterElement}
            />
            <Column header="Details" body={actionBodyTemplate}></Column>
          </DataTable>
        </div>

        <Dialog
          visible={shipmentDialog}
          style={{ width: "1000px" }}
          header="Shipment Details"
          modal
          className="p-fluid"
          footer={shipmentDialogFooter}
          onHide={hideDialog}
        >
          <div className="p-field">
            <label htmlFor="id">Tracking Number</label>
            <InputText
              id="id"
              value={shipment.tracking_num}
              onChange={(e) => onInputChange(e, "tracking_num")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !shipment.tracking_num,
              })}
            />
            {submitted && !shipment.tracking_num && (
              <small className="p-invalid">Tracking Number is required.</small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="name">Customer name</label>
            <InputText
              id="name"
              value={shipment.receiver_name}
              onChange={(e) => onInputChange(e, "receiver_name")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !shipment.receiver_name,
              })}
            />
            {submitted && !shipment.receiver_name && (
              <small className="p-invalid">Customer name is required.</small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="name">Customer phone</label>
            <InputText
              id="phone"
              value={shipment.receiver_phone}
              onChange={(e) => onInputChange(e, "receiver_phone")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !shipment.receiver_phone,
              })}
            />
            {submitted && !shipment.receiver_phone && (
              <small className="p-invalid">Customer phone is required.</small>
            )}
          </div>
        </Dialog>
        <Dialog
          visible={shipmentDetailDialog}
          style={{ width: "1000px" }}
          header={`${shipment.receiver_name}'s Shipment Details`}
          modal
          className="p-fluid"
          onHide={hideDetailDialog}
        >
          <table className="table table-bordered text-center ">
            <thead>
              <tr>
                <th scope="col">Tracking Number</th>
                <th scope="col">Customer name</th>
                <th scope="col">Customer Phone</th>
                <th scope="col">Delivery Date</th>
                <th scope="col">Place Description</th>
                <th scope="col">Added By</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{shipment.tracking_num}</td>
                <td>{shipment.receiver_name}</td>
                <td>{shipment.receiver_phone}</td>
                <td>{moment(shipment.date_added).format("YYYY-MM-DD")}</td>
                <td>{shipment.place_description}</td>
                <td>{shipment.added_by?.username}</td>
              </tr>
            </tbody>
          </table>

          <div className="p-field">
            <label htmlFor="name" className="text-primary">
              Customer Location
            </label>
            <GMap
              options={options}
              style={{ width: "100%", minHeight: "320px" }}
              overlays={overlays}
            />
          </div>
          <div className="p-field">
            <button
              className="btn rs-btn-primary"
              onClick={() => window.open(shipment.location)}
            >
              Cutomer's Location on Google Maps
            </button>
          </div>
        </Dialog>
      </div>
    </div>
  );
};
const mapStateToProps = ({ shipments, statuses, regions, times, user }) => ({
  shipments,
  statuses,
  regions,
  times,
  user,
});
const mapDispatchToProps = {
  fetchRegions,
  fetchTimes,
  addShipment,
};
export default connect(mapStateToProps, mapDispatchToProps)(Shipments);
