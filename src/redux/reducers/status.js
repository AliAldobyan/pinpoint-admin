import { SET_STATUS } from "../actions/actionTypes";

const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_STATUS:
            return action.payload;
        default:
            return state;
    }
};

export default reducer;
