import React, { useEffect, useState, MouseEvent, useRef } from "react";
import GoogleMapReact from "google-map-react";
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch } from "react-redux";
import useSupercluster from 'use-supercluster';

import PinMarker from "./components/PinMarker";
import ClusterMarker from "./components/ClusterMarker";
import PinFormModal from "./components/PinFormModal";
import PinInfoModal from "./components/PinInfoModal";
import { ICoords, IPin } from "./models/pins";
import { useModal, usePinModal } from "./utils/useModal";
import "./assets/App.scss";

function App() {
  let googleKey: string = process.env.REACT_APP_GOOGLE_API_KEY || "";

  const dispatch = useDispatch()
  const { map } = useSelector( ( state: { map: any } ) => state.map );
  console.log("state: map", map)

  const initialCoords = {
    lat: 21.284084348268202,
    lng: -157.7855795839304,
  }


  let [viewCoords, setViewCoords] = useState<ICoords>(initialCoords);
  let [pinCoords, setPinCoords] = useState<ICoords>();

  let [pins, setPins] = useState<IPin[]>([]);

  let { isShown, toggle } = useModal();
  let { pinInfoModal, setPinInfoModal } = usePinModal();


  //////==========
  const mapRef = useRef<any>(null);
  const [bounds, setBounds] = useState<any>(null)
  const [zoom, setZoom] = useState<number>(16);

  const points = pins.map( pin => ({
    "type": "Feature",
    "properties": {
      "cluster": false,
      "pinId": pin.id,
      "text": pin.text
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        pin.coords.lng,
        pin.coords.lat
      ]
    }
  }))

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: {
      radius: 75,
      maxZoom: 20
    }
  })

  //////==========

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

  function renderMarkers() {
    if (clusters == []) return

    return clusters.map( (cluster, index) => {
      const [lng, lat] = cluster.geometry.coordinates;
      const {
        cluster: isCluster,
        point_count: pointCount,
        text: text
      } = cluster.properties;

      if (isCluster) {

        return <ClusterMarker
          key={index}
          id={cluster.properties.id}
          lat={lat}
          lng={lng}
          text={pointCount}
          width={`${10 + (pointCount / points.length ) * 20}px`}
          length={`${10 + (pointCount / points.length ) * 20}px`}
          onClick={() => {
            const expansionZoom = Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20);
            mapRef.current.setZoom(expansionZoom)
            mapRef.current.panTo({lat: lat, lng: lng})
          }}
        />

      } else {

        return <PinMarker
          key={index}
          id={cluster.properties.id}
          lat={lat}
          lng={lng}
          text={text}
          onClick={()=>{
            console.log("clicked!")
          }}
        />

      }
    })

  }


  return (
    <div className="App">

      <div className="body">
        <GoogleMapReact
          bootstrapURLKeys={{ key: googleKey }}
          center={map.center}
          zoom={map.zoom}
          onClick={handleClick}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({map}) => {
            mapRef.current = map;
          }}
          onChange={ ( { zoom , bounds } ) => {
            setZoom(zoom)
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat,
            ])
          }}
        >
          {renderMarkers()}
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
