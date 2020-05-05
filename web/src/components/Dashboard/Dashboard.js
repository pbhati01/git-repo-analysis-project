import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { Container, Row } from 'react-bootstrap';
import { dataActions } from '../../redux/actions';
import AnalyticsData from '../AnalyticsData';
import UserInputForm from '../UserInputForm';
import styles from './Dashboard.styles';
import Header from '../Header';
import Footer from '../Footer';
import Dialog from '../Common/Dialog';

const useStyles = createUseStyles(styles);

const Dashboard = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(dataActions.fetchUserData());
  }, []);

  return (
    <section>    
      <Dialog />
      <Header history={history}/>  
      <Container className={`fluid, ${classes.dashboardContainer}`}>
        <br/>
        <Row>
          <h5>Git Repositoty Form</h5>
        </Row>
        <Row className={classes.userForm}>
          <UserInputForm />
        </Row>
        <br/>
        <Row>
          <h5>Repository Analytics</h5>
        </Row>
        <Row>
          <AnalyticsData />
        </Row>
      </Container>
      <Footer />
    </section>
  );
}

export default Dashboard;