import instance from "./instance";
import { SET_DRIVERS } from "./actionTypes";

export const fetchDrivers = () => async (dispatch) => {
    try {
        const res = await instance.get("drivers/");
        const drivers = res.data;
        dispatch({
            type: SET_DRIVERS,
            payload: drivers,
        });
    } catch (error) {
        console.error(error);
    }
};