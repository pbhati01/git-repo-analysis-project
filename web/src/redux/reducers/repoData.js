import initialState from '../initialState';
import * as actionTypes from '../actions/types';
import _ from 'lodash';

const loadRepoData = (state, data) => {
  const repoData = {...state};
  Object.keys(data).map((key) => {
    const { ownerId, repoName, repoUrl, noOfCommits, openPullRequests, readmeContent, seq } = data[key];
    
    if (_.isEmpty(repoData[ownerId])){
      repoData[ownerId] = {};
    }
    repoData[ownerId][repoName] = { repoUrl, noOfCommits, openPullRequests, readmeContent, seq };
  })
  return ({...state, ...repoData});
};

const updateRepoData = (state, data) => {
  const repoData = {...state};
  if (_.isEmpty(repoData[data.ownerId])){
    repoData[data.ownerId] = {};
  }
  repoData[data.ownerId][data.repoName] = {
    'repoUrl': data.repoUrl,
    'noOfCommits': data.noOfCommits,
    'openPullRequests': data.openPullRequests,
    'readmeContent': '',
    'seq': data.seq
  }
  return ({...state, ...repoData});
};

const updateReadmeContent = (state, data) => {
  const repoData = {...state};
  repoData[data.ownerId][data.repoName].readmeContent = data.readmeContent;
  return ({...state, ...repoData});
};

const repoData = (state = initialState.repoData, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGOUT: 
      return initialState.repoData;
    case actionTypes.LOAD_REPO_DATA: 
      return loadRepoData(state, action.data);
    case actionTypes.UPDATE_REPO_DATA: 
      return updateRepoData(state, action.data);
    case actionTypes.UPDATE_README_CONTENT: 
      return updateReadmeContent(state, action.data);
    default:
      return state;
  }
}

export default repoData;
