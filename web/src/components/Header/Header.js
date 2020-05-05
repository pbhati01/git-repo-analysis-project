import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { Container, Row, Col } from 'react-bootstrap';
import { authActions } from '../../redux/actions';
import styles from './Header.styles';

const useStyles = createUseStyles(styles);

const Header = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userName } = useSelector(state => state.userInfo);

  const userSingout = () => {
    dispatch(authActions.userLogout(() => history.push('/')));
  }

  return (
    <header className={classes.header}>
      <Row className={classes.content}>
        <Col xs={10} className={classes.textLeft}><label className={classes.heading}>{`Welcome ${userName} !`}</label></Col>
        <Col xs={2} className={classes.textRight}><span className={classes.link} onClick={userSingout}>Signout</span></Col>
      </Row>
    </header>
  );
}

export default Header;