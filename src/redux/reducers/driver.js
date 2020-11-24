import { SET_DRIVERS } from "../actions/actionTypes";

const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DRIVERS:
            return action.payload;
        default:
            return state;
    }
};

export default reducer;
