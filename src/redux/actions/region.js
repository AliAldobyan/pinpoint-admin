import instance from "./instance";
import { SET_REGION } from "./actionTypes";

export const fetchRegions = () => async (dispatch) => {
    try {
        const res = await instance.get("regions/");
        const regions = res.data;
        dispatch({
            type: SET_REGION,
            payload: regions,
        });
    } catch (error) {
        console.error(error);
    }
};