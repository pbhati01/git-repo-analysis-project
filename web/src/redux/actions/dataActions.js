import * as ACTION_TYPES from './types';
import { dataService } from '../../api';
import ReactHtmlParser from 'react-html-parser';

export const loadRepoData = (data) => ({
  type: ACTION_TYPES.LOAD_REPO_DATA,
  data
});

export const updateRepoData = (data) => ({
  type: ACTION_TYPES.UPDATE_REPO_DATA,
  data
});

export const updateReadmeContent = (data) => ({
  type: ACTION_TYPES.UPDATE_README_CONTENT,
  data
});

export const showModal = (data) => ({
  type: ACTION_TYPES.SHOW_MODAL,
  data
});

export const hideModal = (data) => ({
  type: ACTION_TYPES.HIDE_MODAL,
  data
});

export const fetchUserData = () => {
  return (dispatch) => {
    dataService
    .fetchUserData()
    .then(res => {
      dispatch(loadRepoData({...res.data}));
    })
    .catch(err => {
      dispatch(showModal({
        title: 'Error',
        content: 'Error while fetching user git analytics data. Please try again.'
      }));
    });
  };
};

export const fetchRepoData = (data) => {
  return (dispatch) => {
    dataService
    .fetchRepoData(data)
    .then(res => {
      dispatch(updateRepoData({...res.data}));
    })
    .catch(err => {
      const { status } = err.response;
      if (status === 404){
        dispatch(showModal({
          title: 'Error',
          content: 'No data found.'
        }));      
      } else{
        dispatch(showModal({
          title: 'Error',
          content: 'Error while fetching repository data. Please try again.'
        }));
      }
    });
  };
};

export const fetchReadmeContent = (data) => {
  return (dispatch) => {
    dataService
    .fetchReadmeContent(data)
    .then(res => {
      dispatch(updateReadmeContent({...data, readmeContent: res.data}));
      dispatch(showModal({
        title: 'Readme.md',
        content: ReactHtmlParser(res.data)
      }));
    })
    .catch(err => {
      const { status } = err.response;
      if (status === 404){
        dispatch(showModal({
          title: 'Error',
          content: 'No Readme Found.'
        }));       
      } else {
        dispatch(showModal({
          title: 'Error',
          content: 'Error while fetching repository data. Please try again.'
        }));
      }
    });
  };
};