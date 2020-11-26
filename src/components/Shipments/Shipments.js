import React, { useState, useEffect, useRef } from "react";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "../../index.css";

import { connect } from "react-redux";

import moment from "moment";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { Toolbar } from "primereact/toolbar";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import "./DataTableDemo.css";

const Shipments = ({ shipments, statuses }) => {
  let emptyProduct = {
    id: null,
    name: "",
    region: "",
    driver: null,
    date: null,
    inventoryStatus: "DELIVERED",
  };

  const [allshipments, setShipments] = useState(shipments || null);
  const [shipmentDialog, setShipmentDialog] = useState(false);

  const [shipment, setShipment] = useState(emptyProduct);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
  const statusesOptions = statuses?.map((status) => status.name);

  useEffect(() => {
    setShipments(shipments);
  }, [shipments]);

  if (!shipments) return <h1> LOADING...</h1>;
  const openNew = () => {
    setShipment(emptyProduct);
    setSubmitted(false);
    setShipmentDialog(true);
  };

  const hideDialog = () => {
    setSubmitted(false);
    setShipmentDialog(false);
  };

  const saveProduct = () => {
    setSubmitted(true);

    if (shipment.name.trim()) {
      let _allshipments = [...allshipments];
      let _shipment = { ...shipment };
      if (shipment.id) {
        const index = findIndexById(shipment.id);

        _allshipments[index] = _shipment;
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Shipment Added",
          life: 3000,
        });
      } else {
        _shipment.id = createId();
        _allshipments.push(_shipment);
        toast.current.show({
          severity: "success",
          summary: "Successful",
          detail: "Shipment Created",
          life: 3000,
        });
      }

      setShipments(_allshipments);
      setShipmentDialog(false);
      setShipment(emptyProduct);
    }
  };

  const editProduct = (shipment) => {
    setShipment({ ...shipment });
    setShipmentDialog(true);
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
      <React.Fragment>
        <Button
          label="New shipment"
          icon="pi pi-plus"
          className="p-button-success"
          onClick={openNew}
        />
      </React.Fragment>
    );
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <span
          className={classNames(
            "customer-badge",
            "status-" + rowData.status.name
          )}
        >
          {rowData.status.name}
        </span>
      </React.Fragment>
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
        className="p-column-filter"
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
    dt.current.filter(event.value, "status.name", "equals");

    setSelectedStatus(event.value);
  };
  const journeyBodyTemplate = (rowData) => {
    return (
      <span className={`shipment-badge driver-${rowData.journey}`}>
        {rowData.journey}
      </span>
    );
  };
  const trackinNumberBodyTemplate = (rowData) => {
    return (
      <span className={`shipment-badge status-${rowData.tracking_num}`}>
        {rowData.tracking_num}
      </span>
    );
  };
  const customerBodyTemplate = (rowData) => {
    return (
      <span className={`shipment-badge status-${rowData.receiver_name}`}>
        {rowData.receiver_name}
      </span>
    );
  };
  //   const regionBodyTemplate = (rowData) => {
  //     return <span>{rowData.region.name}</span>;
  //   };
  const dateBodyTemplate = (rowData) => {
    return (
      <span className={`shipment-badge status-${rowData}`}>
        {moment(rowData.date_added).format("YYYY-MM-DD")}
      </span>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success ml-5"
          onClick={() => editProduct(rowData)}
        />
      </React.Fragment>
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
    <React.Fragment>
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
    </React.Fragment>
  );

  console.log(allshipments);

  const statusFilterElement = renderStatusFilter();
  return (
    <div className="shipments">
      <div className="datatable-crud-demo">
        <Toast ref={toast} />

        <div className="card">
          <Toolbar className="p-mb-4" left={leftToolbarTemplate}></Toolbar>

          <DataTable
            ref={dt}
            value={allshipments}
            selection={selectedProducts}
            onSelectionChange={(e) => setSelectedProducts(e.value)}
            dataKey="id"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Shipments"
            globalFilter={globalFilter}
            header={header}
          >
            <Column
              field="code"
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
              field="date"
              header="Date"
              body={dateBodyTemplate}
              sortable
            ></Column>
            <Column
              field="preferred_time.time"
              header="Preferred Time"

              //   body={journeyBodyTemplate}
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
              //   body={regionBodyTemplate}
              sortable
            ></Column>

            <Column
              field="status.name"
              header="Status"
              body={statusBodyTemplate}
              sortable
              filter
              filterElement={statusFilterElement}
            />
            <Column body={actionBodyTemplate}></Column>
          </DataTable>
        </div>

        <Dialog
          visible={shipmentDialog}
          style={{ width: "600px" }}
          header="Shipment Details"
          modal
          className="p-fluid"
          footer={shipmentDialogFooter}
          onHide={hideDialog}
        >
          <div className="p-field">
            <label htmlFor="id">Tracking num</label>
            <InputText
              id="id"
              value={shipment.tracking_num}
              onChange={(e) => onInputChange(e, "id")}
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
            <label htmlFor="name">Receiver name</label>
            <InputText
              id="name"
              value={shipment.receiver_name}
              onChange={(e) => onInputChange(e, "name")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !shipment.receiver_name,
              })}
            />
            {submitted && !shipment.receiver_name && (
              <small className="p-invalid">Receiver name is required.</small>
            )}
          </div>
          <div className="p-field">
            <label htmlFor="name">Receiver phone</label>
            <InputText
              id="phone"
              value={shipment.receiver_phone}
              onChange={(e) => onInputChange(e, "phone")}
              required
              autoFocus
              className={classNames({
                "p-invalid": submitted && !shipment.receiver_phone,
              })}
            />
            {submitted && !shipment.receiver_phone && (
              <small className="p-invalid">Receiver phone is required.</small>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
};
const mapStateToProps = ({ shipments, statuses }) => ({ shipments, statuses });

export default connect(mapStateToProps)(Shipments);
