import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducers";

// Actions
import {
  fetchShipments,
  fetchJourneys,
  fetchStatuses,
  checkForExpiredToken,
  fetchDrivers,
} from "./actions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

store.dispatch(fetchShipments());
store.dispatch(fetchDrivers());
store.dispatch(fetchJourneys());
store.dispatch(fetchStatuses());
store.dispatch(checkForExpiredToken());

export default store;
