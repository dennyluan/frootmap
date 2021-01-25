import { useState } from 'react';
import { IPin } from "../models/pins";

export const useModal = () => {
  const [isShown, setIsShown] = useState<boolean>(false);
  const toggle = () => setIsShown(!isShown);
  return {
    isShown,
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