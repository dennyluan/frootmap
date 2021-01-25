import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modal, { Styles } from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

export const PinFormModal = (modalProps: {
  isShown: boolean;
  hide: any;
  createPin: any;
  clearPins: () =>  void;
}) => {
  const [fruit, setFruit] = useState<string>("");
  const [error, setError] = useState<string>("");

  const FRUITS = [
    "Mango",
    "Pineapple",
    "Lemon",
    "Lime",
    "Orange",
    "Coconut",
    "Pomegranate",
    "Pomelo",
    "Eggplant",
  ];

  // const onKeyDown = (event: Event;) => {
  //   console.log('event', event)
  //   if (event.keyCode === 27 && modalProps.isShown) {
  //     modalProps.hide();
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('keydown', onKeyDown, false);
  //   return () => {
  //     document.removeEventListener('keydown', onKeyDown, false);
  //   };
  // }, [modalProps.isShown]);

  function renderFruits() {
    return FRUITS.map((f, i) => {
      return renderButton(f, i);
    });
  }

  function renderButton(f: string, i: number) {
    const classes =
      fruit === f ? "btn btn-dark m-2" : "btn btn-outline-dark m-2";

    return (
      <button className={classes} onClick={() => setFruit(f)} key={i}>
        {f}
      </button>
    );
  }

  function handleClose() {
    setFruit("");
    setError("");
    modalProps.hide();
  }

  function handleClick() {
    if (fruit) {
      modalProps.createPin(fruit);
      handleClose();
    } else {
      setError("Please select a fruit!");
    }
  }

  return (
    <div>
      <Modal
        isOpen={modalProps.isShown}
        className="modal modal.shown animate__animated animate__slideInUp animate__faster"
        contentLabel="Create a pin modal"
        onRequestClose={() => handleClose()}
        shouldCloseOnOverlayClick={true}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Choose a fruit:</h5>
              <FontAwesomeIcon
                icon={faTimesCircle}
                onClick={modalProps.hide}
                aria-label="Close"
                className="btn-close"
              />
            </div>

            <div className="modal-body">
              {error && <p className="alert alert-danger">{error}</p>}
              {renderFruits()}
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-danger ml-3"
                onClick={modalProps.clearPins}
              >
                Clear pins
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => handleClose()}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleClick()}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
