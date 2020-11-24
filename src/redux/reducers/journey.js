import { SET_JOURNEYS, ADD_JOURNEY, ASSIGN_DRIVER } from "../actions/actionTypes";

const initialState = null;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_JOURNEYS:
            return action.payload;
        case ADD_JOURNEY:
            return [action.payload, ...state]
        case ASSIGN_DRIVER:
            const journeyID = action.payload.driver.id
            state = state.map(journey => journey.id === journeyID ? {...journey, driver: action.payload.journey.driver} : journey)
            return state
        default:
            return state;
    }
};

export default reducer;
