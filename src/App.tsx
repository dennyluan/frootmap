import React, { useEffect, useState } from 'react';
import './assets/App.css';

import GoogleMapReact from 'google-map-react';

function App() {
  let googleKey : string = ((process.env.NODE_ENV == 'production') ?
    process.env.GOOGLE_API_KEY :
    process.env.REACT_APP_GOOGLE_API_KEY) || ''

  let [coords, setCoords] = useState( {lat: 21.284084348268202,lng: -157.7855795839304} );
  let [zoom, setZoom] = useState(16);

  interface Position {
    coords: {
      latitude : number,
      longitude : number
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: Position) => {
          setCoords({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        () => {
          console.log("error")
        }
      )
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Frootmap</h1>
      </header>

      <div className="body">
        <GoogleMapReact
          bootstrapURLKeys={{key: googleKey}}
          center={coords}
          zoom={zoom}
        >
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default App;
