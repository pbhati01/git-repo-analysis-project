import axios from 'axios';
import { getUserData } from './authService';
import { BASE_CONTEXT } from '../utils/constants';

export const fetchUserData = () => {
    const { user: { userId } = {}, token } = getUserData();
    const headers = {'Authorization': `Bearer ${token}`};
    const url = `${BASE_CONTEXT}/api/fetchUserData?userId=${userId}`;
    return axios.get(url, { headers });
}

export const fetchRepoData = ({ ownerId, repoName, seq }) => {
    const { user: { userId } = {}, token } = getUserData();
    const headers = {'Authorization': `Bearer ${token}`};
    const url = `${BASE_CONTEXT}/api/getRepoData?userId=${userId}&ownerId=${ownerId}&repoName=${repoName}&seq=${seq}`;
    return axios.get(url, { headers });
}

export const fetchReadmeContent = ({ ownerId, repoName }) => {
    const { user: { userId } = {}, token } = getUserData();
    const headers = {'Authorization': `Bearer ${token}`};
    const url = `${BASE_CONTEXT}/api/getReadme?userId=${userId}&ownerId=${ownerId}&repoName=${repoName}`;
    return axios.get(url, { headers });
}