import React from 'react';

const DriversList = ({ drivers, selectedDriver, setSelectedDriver }) => {

    const onDriverChange = (e) => {
        const driver = drivers.find(driver => driver.id === Number(e.target.value))
        setSelectedDriver(driver);
    }

    const driversOptions = drivers.map(driver => (
        <option key={driver.id} value={driver.id} onClick={onDriverChange}>{driver.user.first_name} {driver.user.last_name} | {driver.phone}</option>
    ))

    return (
        <div className="row">
            <div className="form-group col-4">
                <select defaultValue="" className="form-control" id="exampleFormControlSelect1">
                    <option value="" onClick={() => setSelectedDriver(null)}>Select a Driver..</option>
                    {driversOptions}
                </select>
            </div>
        </div>
    );
};

export default DriversList;
