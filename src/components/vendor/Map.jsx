import React, { useState } from 'react'
import {GoogleMap,LoadScript,Marker} from '@react-google-maps/api'

const Map = ({latitude, longitude, setLatitude, setLongitude}) => {
    const [map, setMap] = useState(null);
  const [infoWindow, setInfoWindow] = useState(null);

  const defaultCenter = { lat:12.638576007150657 , lng:79.21810729908728  };

  const handleMapClick = (event) => {

    console.log("clicked the map")
    // if (infoWindow) {
    //   infoWindow.close();
    // }

    const clickedPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };

    console.log(clickedPosition,"here is clickdd")

    if (setLatitude && setLongitude) {
      setLatitude(clickedPosition.lat);
      setLongitude(clickedPosition.lng);
    }

    const newInfoWindow = new window.google.maps.InfoWindow({
      content: JSON.stringify(clickedPosition, null, 2),
      position: clickedPosition,
    });

    newInfoWindow.open(map);

    setInfoWindow(newInfoWindow);
  };

  return (
    <>
        <LoadScript googleMapsApiKey="AIzaSyAy_ajgOag8oeNWY_jPW3GL4Tq9Xxysbj0">
      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '300px' }}
        zoom={4}
        center={defaultCenter}
        onClick={handleMapClick}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
    </>
  )
}

export default Map
