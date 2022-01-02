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

}

export const registerAPI = async (email, password, name) => {

}

export const forgotPasswordAPI = async (email) => {

}

export const changePasswordAPI = async (password) => {

}

export const addClientAPI = async () => {

}