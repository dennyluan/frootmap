import React, { useEffect, useState, MouseEvent } from "react";
import "./assets/App.scss";
import { PinMarker } from "./components/PinMarker";
import { PinFormModal } from "./components/PinFormModal";
import { PinInfoModal } from "./components/PinInfoModal";

import { ICoords, IPin } from "./models/pins";
import { useModal, usePinModal } from "./utils/useModal";

import GoogleMapReact from "google-map-react";
import { v4 as uuidv4 } from 'uuid';


function App() {
  const initialCoords = {
    lat: 21.284084348268202,
    lng: -157.7855795839304,
  }

  let googleKey: string = process.env.REACT_APP_GOOGLE_API_KEY || "";
  let [viewCoords, setViewCoords] = useState<ICoords>(initialCoords);
  let [pinCoords, setPinCoords] = useState<ICoords>();
  let [zoom, setZoom] = useState<number>(16);
  let [pins, setPins] = useState<IPin[]>([]);

  let { isShown, toggle } = useModal();
  let { pinInfoModal, setPinInfoModal } = usePinModal();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: {coords:{latitude: number, longitude: number}}) => {
          setViewCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.log("error");
        }
      );
    }

    loadPins()
  }, []);

  function loadPins() {
    let localPins : string = localStorage.getItem('localPins') || '[]'

    let localPinsParsed : IPin[] = JSON.parse(localPins)

    if (localPinsParsed) {
      let newPins : IPin[] = pins
      let collected : IPin[] = newPins.concat(localPinsParsed)
      setPins(collected)
    }
  }

  const createPin = (fruit: string) => {
    if (pinCoords && pinCoords.lat) {
      let id = uuidv4()
      let pin : IPin = {
        coords: {
          lat: pinCoords.lat,
          lng: pinCoords.lng,
        },
        id: id,
        text: fruit
      }
      const newPins : IPin[] = [...pins, pin] || [pins]

      setPins(newPins);
      localStorage.setItem('localPins', JSON.stringify(newPins));
    }
  }

  const clearPins = () : void => {
    localStorage.removeItem("localPins")
    setPins([])
    toggle()
  }

  const handleClick = ({
    x,
    y,
    lat,
    lng,
    event,
  }: {
    x: number;
    y: number;
    lat: number;
    lng: number;
    event: MouseEvent<HTMLButtonElement>;
  }): any => {
    event.preventDefault();
    console.log('mapclick')
    setPinCoords({lat: lat, lng: lng})
    if (!isShown)
      toggle()
  };

  function renderPinMarkers() {
    if (pins == []) return
    return pins.map((pin, index) => (
      <PinMarker
        // coords={pin.coords}
        lat={pin.coords.lat}
        lng={pin.coords.lng}
        text={pin.text}
        id={pin.id}
        key={index}
      />
    ));
  }

  return (
    <div className="App">
      {/*<header className="App-header py-2">
        <h1>Frootmap</h1>

        <div className="row">
          <button
            onClick={toggle}
            className="btn btn-primary"
          >
            Add pin
          </button>

          {pins && (pins.length >= 1) &&
            <button
              className="btn btn-danger ml-3"
              onClick={clearPins}
            >
              Clear pins
            </button>
          }
        </div>
      </header>*/}

      <div className="body">
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleKey }}
          center={viewCoords}
          zoom={zoom}
          onClick={handleClick}
        >
          {renderPinMarkers()}
        </GoogleMapReact>

        <PinFormModal
          isShown={isShown}
          hide={toggle}
          createPin={createPin}
          clearPins={clearPins}
        />

        <PinInfoModal
          pinInfoModal={pinInfoModal}
        />
      </div>

    </div>
  );
}

export default App;
