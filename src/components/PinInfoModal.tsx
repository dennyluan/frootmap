import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modal, { Styles } from "react-modal";

Modal.setAppElement("#root");

export const PinInfoModal = ( modalProps: any ) => {

  console.log('modalProps', modalProps)

  let open = false

  return <Modal
    isOpen={open}
    className="modal modal.shown animate__animated animate__slideInUp animate__faster"
    contentLabel="Create a pin modal"
    // onRequestClose={() => modalProps.hide}
    shouldCloseOnOverlayClick={true}
  >

    <h1>hi</h1>
  </Modal>
}
