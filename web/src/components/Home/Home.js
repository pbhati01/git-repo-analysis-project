import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { Row, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { authActions } from '../../redux/actions';
import styles from './Home.styles';

const useStyles = createUseStyles(styles);

const Home = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if(urlParams.has('code')) {
      setIsSigningIn(true);
      const code = urlParams.get('code');
      dispatch(authActions.userLogin(code, () => history.push('/dashboard')));
    } 
  }, [history]);

  const signIn = () => {
    setIsSigningIn(true);
    window.location = 'https://github.com/login/oauth/authorize?client_id=e4de3556c1af976c2c5f';
  };

  return (
    <section className={`fluid, ${classes.landingPageContainer}`}>
      {isSigningIn ? 'Signing in...'
        : 
        <div>
          <Row>
            <h1>Git Repo Analysis Project</h1> 
          </Row>
          <Row>
            <p>Please sign in with your github account.</p> 
          </Row>
          <Row>
            <Button variant="primary" onClick={signIn}>Sign In</Button>
          </Row>
        </div>}
    </section>
  );
}

export default Home;