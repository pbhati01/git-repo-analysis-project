import initialState from '../initialState';
import * as actionTypes from '../actions/types';

const modal = (state = initialState.modal, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGOUT: 
      return ({ ...initialState.modal });
    case actionTypes.SHOW_MODAL: 
      return ({...state, show:true, ...action.data});
    case actionTypes.HIDE_MODAL: 
      return ({
        show: false,
        title: '',
        content: ''
      });
    default:
      return state;
  }
}

export default modal;
