import React from "react";

export const PinMarker = ({
  lat,
  lng,
  text,
}: {
  lat: number;
  lng: number;
  text: string;
}) => {
  return (
    <div className="pin-marker">
      <div className="arrow"/>
      {text}
    </div>
  );
};
