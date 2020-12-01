import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';

const DriversList = ({ drivers, selectedDriver, setSelectedDriver }) => {

    const onDriverChange = (e) => {
        setSelectedDriver(e.value);
    }

    const selectedDriverTemplate = (option, props) => {
        if (option) {
            return (
                <div>
                    <div>{option.user.first_name} {option.user.last_name} | {option.phone}</div>
                </div>
            );
        }

        return (
            <span>
                {props.placeholder}
            </span>
        );
    }

    const driverOptionTemplate = (option) => {
        return (
            <div>
                <div>{option.user.first_name} {option.user.last_name} | {option.phone}</div>
            </div>
        );
    }
    console.log(selectedDriver);
    console.log(drivers);
    return (
        <div>
            <Dropdown value={selectedDriver} options={drivers} onChange={onDriverChange} optionLabel="user.first_name"
                      filter showClear filterBy="user.last_name,user.first_name"  placeholder="Select a Driver"
                      valueTemplate={selectedDriverTemplate} itemTemplate={driverOptionTemplate} style={{width: "40%"}}/>
        </div>
    );
};

export default DriversList;
