import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { createUseStyles } from 'react-jss'
import { useDispatch, useSelector } from 'react-redux';

import styles from './Dialog.styles';
import { dataActions } from '../../../redux/actions';

const useStyles = createUseStyles(styles);

const Dialog = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { show, title, content } = useSelector(state => state.modal);
  
  const handleClose = () => {
    dispatch(dataActions.hideModal({}));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Dialog;