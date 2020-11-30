import instance from "./instance";
import { SET_JOURNEYS, ADD_JOURNEY, ASSIGN_DRIVER } from "./actionTypes";
import {fetchShipments} from "./shipment";

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

export const addJourney = (journeyData) => async (dispatch) => {
    try {
        const res = await instance.post("journeys/add/", journeyData);
        const journey = res.data;
        dispatch(fetchShipments())
        dispatch({
            type: ADD_JOURNEY,
            payload: journey,
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