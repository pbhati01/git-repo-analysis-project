import initialState from '../initialState';
import * as actionTypes from '../actions/types';

const userInfo = (state = initialState.userInfo, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGOUT: 
      return ({ ...initialState.userInfo, isAuthValidated: true });
    case actionTypes.UPDATE_USER_INFO: 
      return ({...state, ...action.data});
    case actionTypes.SET_IS_AUTH_VALIDATED: 
      return ({...state, isAuthValidated: action.isAuthValidated});
    default:
      return state;
  }
}

export default userInfo;
