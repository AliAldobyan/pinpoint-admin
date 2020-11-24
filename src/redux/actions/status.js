import instance from "./instance";
import { SET_STATUS } from "./actionTypes";

export const fetchStatuses = () => async (dispatch) => {
    try {
        const res = await instance.get("statuses/");
        const statuses = res.data;
        dispatch({
            type: SET_STATUS,
            payload: statuses,
        });
    } catch (error) {
        console.error(error);
    }
};
