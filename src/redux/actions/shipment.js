import instance from "./instance";
import { SET_SHIPMENTS, ADD_SHIPMENT } from "./actionTypes";

export const fetchShipments = () => async (dispatch) => {
    try {
        const res = await instance.get("shipments/");
        const shipments = res.data;
        dispatch({
            type: SET_SHIPMENTS,
            payload: shipments,
        });
    } catch (error) {
        console.error(error);
    }
};

export const addShipment = (shipmentData) => async (dispatch) => {
    try {
        const res = await instance.post("shipments/add/", shipmentData);
        const newShipment = res.data;
        dispatch({
            type: ADD_SHIPMENT,
            payload: newShipment,
        });
    } catch (error) {
        console.error(error);
    }
};