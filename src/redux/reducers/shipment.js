import { SET_SHIPMENTS, ADD_SHIPMENT } from "../actions/actionTypes";

const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SHIPMENTS:
            return action.payload;
        case ADD_SHIPMENT:
            return [action.payload, ...state]
        default:
            return state;
    }
};

export default reducer;
