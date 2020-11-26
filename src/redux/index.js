import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducers";

// Actions

import { fetchShipments } from "./actions";
import { fetchJourneys } from "./actions";
import { fetchStatuses } from "./actions";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

store.dispatch(fetchShipments());

store.dispatch(fetchJourneys());
store.dispatch(fetchStatuses());

export default store;
