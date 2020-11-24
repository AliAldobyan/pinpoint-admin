import { SET_REGION } from "../actions/actionTypes";

const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_REGION:
            return action.payload;
        default:
            return state;
    }
};

export default reducer;
