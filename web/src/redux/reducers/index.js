import { combineReducers } from 'redux';
import repoData from './repoData';
import userInfo from './userInfo';
import modal from './modal';

export default combineReducers({
    userInfo,
    repoData,
    modal
});
