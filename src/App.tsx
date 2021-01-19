import React, { useEffect, useState, MouseEvent } from "react";
import "./assets/App.css";
import { PinMarker } from "./components/PinMarker";
import { PinModal } from "./components/PinModal";
import { useModal } from "./utils/useModal";

import GoogleMapReact from "google-map-react";

interface ICoords {
  lat: number,
  lng: number
}

interface IPin {
  text: string,
  coords: ICoords
}

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

  useEffect(()=>{
    // localStorage.setItem('localPins', JSON.stringify(pins));
  }, [pins])

  function loadPins() {
    let localPins : any = localStorage.getItem('localPins')
    let localPinsParsed = JSON.parse(localPins)

    if (localPins) {
      let newPins = pins
      let collected = newPins.concat(localPinsParsed)
      setPins(collected)
    }
    // console.log('localPins', localStorage.getItem("localPins"))
  }

  const createPin = (fruit: string) => {
    if (pinCoords && pinCoords.lat) {
      let pin : IPin = {
        coords: {
          lat: pinCoords.lat,
          lng: pinCoords.lng,
        },
        text: fruit
      }
      const newPins = [...pins, pin] || [pins]
      setPins(newPins);
      localStorage.setItem('localPins', JSON.stringify(newPins));
    }
  }

  const clearPins = () =>{
    console.log("clearing pins")
    localStorage.removeItem("localPins")
    setPins([])
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
    return pins.map((pin, index) => (
      <PinMarker key={index} lat={pin.coords.lat} lng={pin.coords.lng} text={pin.text} />
    ));
  }

  return (
    <div className="App">
      <header className="App-header py-2">
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
      </header>

      <div className="body">
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleKey }}
          center={viewCoords}
          zoom={zoom}
          onClick={handleClick}
        >
          {renderPinMarkers()}
        </GoogleMapReact>

        <PinModal
          isShown={isShown}
          hide={toggle}
          createPin={createPin}
        />
      </div>

    </div>
  );
}

export default App;
