import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { Form, Button } from 'react-bootstrap';
import { dataActions } from '../../redux/actions';
import { getSortedRepoData } from '../../redux/selectors';
import styles from './UserInputForm.styles';

const useStyles = createUseStyles(styles);

const UserInputForm = () => {
  const classes = useStyles();
  const [ownerId, setOwnerId] = useState('');
  const [repoName, setRepoName] = useState('');
  const sortedRepoData = useSelector(getSortedRepoData);

  const dispatch = useDispatch();

  const handleOwnerChange = (e) => {
    setOwnerId(e.target.value);
  };

  const handleRepoChange = (e) => {
    setRepoName(e.target.value);
  };

  const getRepoData = () => {
    const seq = sortedRepoData.length;
    dispatch(dataActions.fetchRepoData({ ownerId, repoName, seq }));    
  }

  return (
    <Form>
      <Form.Group controlId="ownerId">
        <Form.Label>Owner</Form.Label>
        <Form.Control type="text" placeholder="Enter Owner" value={ownerId} onChange={handleOwnerChange} />
      </Form.Group>      
      <Form.Group controlId="repoName">
        <Form.Label>Repo</Form.Label>
        <Form.Control type="text" placeholder="Repository Name" value={repoName} onChange={handleRepoChange}/>
      </Form.Group>
      <Button className={classes.button} variant="primary" onClick={getRepoData} disabled={!(ownerId && repoName)}>Get Data</Button>
    </Form>
  );
}

export default UserInputForm;