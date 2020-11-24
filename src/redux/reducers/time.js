import { SET_TIMES } from "../actions/actionTypes";

const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TIMES:
            return action.payload;
        default:
            return state;
    }
};

export default reducer;
