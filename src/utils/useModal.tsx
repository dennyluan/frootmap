import { useState } from 'react';
import { ICoords, IPin } from "../models/pins";

export const useModal = () => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const [modalPinCoords, setModalPinCoords] = useState<ICoords>({lat: 0, lng: 0});

  const toggle = (coords?: ICoords) => {
    if (coords) { setModalPinCoords(coords) }
    setIsShown(!isShown);
  }

  return {
    isShown,
    modalPinCoords,
    toggle,
  };
};

export const usePinModal = () => {
  const [pinInfoModal, setIsShown] = useState<IPin | {}>();

  const setPinInfoModal = ( pin: IPin ) => {
    if (pin) {
      setIsShown(pin);
    } else {
      setIsShown({});
    }
  }

  return {
    pinInfoModal,
    setPinInfoModal,
  };
};