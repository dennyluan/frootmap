import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modal, { Styles } from "react-modal";
import { IPin } from "models/pins"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { deletePin } from 'features/pinSlice'

Modal.setAppElement("#root");

interface ModalProps {
  // pin?: IPin,
  pin?: any,
  hide: () => void,
}

const PinModal = ( props: ModalProps ) => {

  const dispatch = useDispatch()
  const { pin } = props;

  let open = (pin && pin.id != undefined) || false

  function handleClose() {
    props.hide();
  }

  function handleDelete() {
    dispatch(deletePin(pin.id))
    props.hide()
  }

  return <Modal
    isOpen={open}
    className="modal modal.shown animate__animated animate__slideInUp animate__faster"
    contentLabel="About this pin"
    onRequestClose={() => handleClose()}
    shouldCloseOnOverlayClick={true}
  >

    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{pin && pin.text}</h3>
          <FontAwesomeIcon
            icon={faTimesCircle}
            onClick={() => handleClose()}
            aria-label="Close"
            className="btn-close"
          />
        </div>
        <div className="modal-body">
          <p>About this pin:</p>
          <h4>{pin && pin.text}</h4>
          <button
            className="btn btn-danger mv-3"
            onClick={() => handleDelete()}
          >
            Delete this pin
          </button>
        </div>
      </div>
    </div>

  </Modal>
}

export default PinModal
