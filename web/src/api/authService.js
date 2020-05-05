import axios from 'axios';
import { BASE_CONTEXT } from '../utils/constants';

export const removeUserData = () => {
    localStorage.removeItem('userData');
}

export const setUserData = (data) => {
    localStorage.setItem('userData', JSON.stringify(data));
}

export const getUserData = () => {
    return JSON.parse(localStorage.getItem('userData')) || {};
}

export const checkAuth = () => {
    const { user: { userId } = {}, token } = getUserData();
    if (!userId || !token) return Promise.resolve({ data: {} });
    const headers = {'Authorization': `Bearer ${token}`};
    const url = `${BASE_CONTEXT}/api/validate/user?userId=${userId}`;
    return axios.get(url, { headers });
}

export const userLogin = (code) => {
    const { token } = getUserData();
    const headers = {'Authorization': `Bearer ${token}`};
    const url = `${BASE_CONTEXT}/api/user/signin?code=${code}`;
    return axios.get(url, { headers });
}

export const userLogout = () => {
    const { user: { userId , userName } = {}, token } = getUserData();
    const headers = {'Authorization': `Bearer ${token}`};
    const url = `${BASE_CONTEXT}/api/user/logout?userId=${userId}&userName=${userName}&token=${token}`;
    return axios.get(url, { headers });
}