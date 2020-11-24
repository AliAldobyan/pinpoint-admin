import decode from "jwt-decode";
import instance from "./instance";
import { SET_CURRENT_USER } from "./actionTypes";
import Cookies from "js-cookie";

export const login = (userData) => {
    return async (dispatch) => {
        try {
            const res = await instance.post("login/", userData);
            const { access } = res.data;
            dispatch(setCurrentUser(access));
        } catch (err) {
            console.error(err)
        }
    };
};

const setAuthToken = (token) => {
    if (token) {
        Cookies.set("token", token);
        instance.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
        delete instance.defaults.headers.Authorization;
        Cookies.remove("token");
    }
};

const setCurrentUser = (token) => {
    return async (dispatch) => {
        setAuthToken(token);
        const user = token ? decode(token) : null;
        dispatch({
            type: SET_CURRENT_USER,
            payload: user,
        });
    }
};

export const logout = () => setCurrentUser();

export const checkForExpiredToken = () => {
    const token = Cookies.get("token");
    if (token) {
        const currentTimeInSeconds = Date.now() / 1000;
        const user = decode(token);
        if (user.exp >= currentTimeInSeconds) {
            return setCurrentUser(token);
        }
    }
    return setCurrentUser();
};
