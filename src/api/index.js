import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/";

const apiReq = async (params, route, method = 'post') => {

    try {
        console.log('params = ', params)
        const res = await axios({
            method,
            url: BASE_URL + route,
            data: params
        })
        console.log('res = ', res)
        return res;
    } catch (e) {
        alert(`NETWORK ERROR: ${e.message}`)
    }
}

export const loginAPI = async (userName, password) => {
    const params = {
        username: userName,
        password
    }
    const res = await apiReq(params, 'login/')
    return !!res.data.Success ? {isAuthenticated: true} : {isAuthenticated: false, errorMsg: res?.data?.Fail ?? 'error'}
}

export const registerAPI = async (email, password, userName) => {
    const params = {
        username: userName,
        password,
        email
    }
    const res = await apiReq(params, 'register/')
    return !!res.data.Success ? {isAuthenticated: true} : {isAuthenticated: false, errorMsg: res?.data?.Fail ?? 'error'}
}

export const forgotPasswordAPI = async (userName) => {
    const res = await apiReq({username: userName}, 'forgot_pass/')
    return !!res.data.Success ? {isAuthenticated: true} : {isAuthenticated: false, errorMsg: res?.data?.Fail ?? 'error'}
}

export const changePasswordAPI = async (password, newPassword) => {
    const res = await apiReq({password, new_password: newPassword}, 'change_pass/')
    return !!res.data.Success ? {isAuthenticated: true} : {isAuthenticated: false, errorMsg: res?.data?.Fail ?? 'error'}
}

export const addClientAPI = async (firstName, lastName, email) => {
    const res = await apiReq({email, first_Name: firstName, last_name: firstName}, 'menu/add_customer/')
    return !!res.data.Success ? {isAuthenticated: true} : {isAuthenticated: false, errorMsg: res?.data?.Fail ?? 'error'}
}