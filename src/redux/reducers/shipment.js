import {SET_SHIPMENTS, ADD_SHIPMENT, ADD_JOURNEY} from "../actions/actionTypes";

const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_SHIPMENTS:
            return action.payload;

        case ADD_SHIPMENT:
            return [action.payload, ...state]

        case ADD_JOURNEY:
            const status = action.payload.journey.packages[0]?.status
            const shipments = action.payload.packages.packages_list
            state = state.map(shipment => shipments.includes(shipment.id) ? {...shipment, status:status} : shipment)
            return state

        default:
            return state;

    }
};

export default reducer;
