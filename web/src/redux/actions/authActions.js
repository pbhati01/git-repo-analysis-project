import * as ACTION_TYPES from './types';
import { authService } from '../../api';
import { showModal } from './dataActions';

export const updateUserInfo = (data) => ({
  type: ACTION_TYPES.UPDATE_USER_INFO,
  data
});

export const setIsAuthValidated = (isAuthValidated) => ({
  type: ACTION_TYPES.SET_IS_AUTH_VALIDATED,
  isAuthValidated
});

export const resetStore = () => ({
  type: ACTION_TYPES.USER_LOGOUT,
  data: null
});

export const checkAuth = (redirectToHome, redirectToDashboard) => {
  return (dispatch) => {
    authService
    .checkAuth()
    .then(res => {
      dispatch(setIsAuthValidated(true));
      if(!res.data.isAuthenticated) {
        redirectToHome();
      } else {
        const userData = authService.getUserData();
        dispatch(updateUserInfo(userData.user || {}));
        redirectToDashboard();
      }
    })
    .catch(err => {
      dispatch(showModal({
        title: 'Error',
        content: 'Error while authenticating user. Please try again.'
      }));
    });
  };
};

export const userLogin = (code, redirectToDashboard) => {
  return (dispatch) => {
    authService
    .userLogin(code)
    .then(res => {
      dispatch(updateUserInfo(res.data.user));
      dispatch(setIsAuthValidated(true));
      authService.setUserData(res.data);
      redirectToDashboard();
    })
    .catch(err => {
      dispatch(showModal({
        title: 'Error',
        content: 'Error while signing in user. Please try again.'
      }));
    });
  };
};

export const userLogout = (redirectToHome) => {
  return (dispatch) => {
    authService
    .userLogout()
    .then(res => {
      authService.removeUserData();
      dispatch(resetStore());
      redirectToHome();
    })
    .catch(err => {
      dispatch(showModal({
        title: 'Error',
        content: 'Error while logout. Please try again.'
      }));
    });
  };
};