import { combineReducers } from "redux";

import driverReducer from "./driver"
import timeReducer from "./time"
import statusReducer from "./status"
import regionReducer from "./region"
import shipmentReducer from "./shipment"
import journeyReducer from "./journey"

const rootReducer = combineReducers({
    drivers: driverReducer,
    times: timeReducer,
    statuses: statusReducer,
    regions: regionReducer,
    shipments: shipmentReducer,
    journeys: journeyReducer,
});

export default rootReducer;