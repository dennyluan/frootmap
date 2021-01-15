import React from 'react';
import './assets/App.css';

import GoogleMapReact from 'google-map-react';


const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY

function App() {

  const props = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };


  return (
    <div className="App">
      <header className="App-header">
        <h1>Frootmap</h1>
      </header>

      <body>
        <p>Map</p>
        <GoogleMapReact
          // bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
          defaultCenter={props.center}
          defaultZoom={props.zoom}
        >
        </GoogleMapReact>
      </body>
    </div>
  );
}

export default App;
