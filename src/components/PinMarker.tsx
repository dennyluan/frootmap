import React from "react";
import { IPin } from "../models/pins";

const PinMarker = ( pin : any ) => {

  const clickHandler = () => {
    pin.onClick()
  }

  return (
    <div
      style={pin.style}
      className="pin-marker"
      onClick={clickHandler}
    >
      <div className="arrow"/>
      {pin.text}
    </div>
  );
};

export default PinMarker