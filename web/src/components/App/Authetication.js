import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/actions';

const Authetication = ({ history }) => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(authActions.checkAuth(() => history.push('/'), () => history.push('/dashboard')));
  }, []);

  return null;
};

export default Authetication;
