import React from 'react';

const JourneyItem = ({ journey }) => {
    return (
        <div>
            <h1>id: {journey.id}</h1>
            {journey.driver || journey.is_completed ? <p>{journey.driver?.user.first_name} {journey.driver?.user.last_name} {journey.driver?.phone}</p> :
                <button className="btn btn-outline-dark">Assign Driver</button>}
            <p>Status: {journey.is_completed ? <>Completed</> : <>Active</>}</p>
            <h5>Number of packages: {journey.packages.length}</h5>
            <p>Region: {journey.packages[0]?.region?.name}</p>
        </div>
    );
};

export default JourneyItem;