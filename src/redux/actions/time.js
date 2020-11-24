import instance from "./instance";
import { SET_TIMES } from "./actionTypes";

export const fetchTimes = () => async (dispatch) => {
    try {
        const res = await instance.get("times/");
        const times = res.data;
        dispatch({
            type: SET_TIMES,
            payload: times,
        });
    } catch (error) {
        console.error(error);
    }
};
