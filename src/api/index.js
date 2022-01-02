import axios from "axios";

const BASE_URL = "";

const apiReq = (method, params) => {
    return axios({
        method,
        url: BASE_URL,
        data: params
    })
}

export const loginAPI = async (email, password) => {
    return true;
}

export const registerAPI = async (email, password, name) => {
    return true;
}

export const forgotPasswordAPI = async (email) => {
    return true;
}

export const changePasswordAPI = async (password) => {
    return true;
}

export const addClientAPI = async () => {
    return true;
}