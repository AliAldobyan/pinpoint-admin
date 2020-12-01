import {ASSIGN_DRIVER, SET_DRIVERS} from "../actions/actionTypes";

const initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_DRIVERS:
            return action.payload;

        case ASSIGN_DRIVER:
            const driverID = action.payload.journey.driver.id
            const newJourney = action.payload.journey.driver.journeys[action.payload.journey.driver.journeys.length - 1]
            const driverMatch = state.find(driver => driver.id === driverID)
            state = state.map(driver => driver === driverMatch ? {...driver, journeys:[...driver.journeys, newJourney]} : driver)
            return state

        default:
            return state;

    }
};

export default reducer;
