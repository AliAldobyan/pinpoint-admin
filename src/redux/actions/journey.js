import instance from "./instance";
import { SET_JOURNEYS, ADD_JOURNEY, ASSIGN_DRIVER } from "./actionTypes";

export const fetchJourneys = () => async (dispatch) => {
    try {
        const res = await instance.get("journeys/");
        const journeys = res.data;
        dispatch({
            type: SET_JOURNEYS,
            payload: journeys,
        });
    } catch (error) {
        console.error(error);
    }
};

export const addJourney = (packages) => async (dispatch) => {
    try {
        const res = await instance.post("journeys/add/", packages);
        const journey = res.data;
        dispatch({
            type: ADD_JOURNEY,
            payload: {journey, packages},
        });
    } catch (error) {
        console.error(error);
    }
};

export const assignDriver = (driver) => async (dispatch) => {
    try {
        const res = await instance.put("journeys/assign-driver/", driver);
        const journey = res.data;
        dispatch({
            type: ASSIGN_DRIVER,
            payload: {journey, driver},
        });
    } catch (error) {
        console.error(error);
    }
};