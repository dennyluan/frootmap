import React from "react";
import { IPin } from "../models/pins";

export const PinMarker = ( pin : any ) => {

  const clickHandler = () => {
    console.log("clicked!", pin)
  }

  return (
    <div
      className="pin-marker"
      onClick={clickHandler}
    >
      <div className="arrow"/>
      {pin.text}
    </div>
  );
};
