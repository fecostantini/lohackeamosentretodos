// React
import React from 'react';

// APIs
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";

import { GoogleMaps } from './credentials';


function Map () {

    const MapWithComponents =withScriptjs(withGoogleMap(props =>
        <GoogleMap
          defaultZoom={4}
          defaultCenter={{ lat: -37.0560032, lng: -81.6327078 }}
        >
        </GoogleMap>
    ))

    return (
        <MapWithComponents
            googleMapURL= {`https://maps.googleapis.com/maps/api/js?key=${GoogleMaps}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `700px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    )
}

export default Map;