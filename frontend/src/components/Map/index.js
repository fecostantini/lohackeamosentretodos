/*global google*/

import React from 'react';
import { GoogleMaps } from './credentials';

const _ = require('lodash');
const { compose, withProps, lifecycle, withStateHandlers } = require('recompose');
const { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } = require('react-google-maps');
const { SearchBox } = require('react-google-maps/lib/components/places/SearchBox');

const ubicacionArgentina = { lat: -41.2006336, lng: -66.5713392 };

const Map = compose(
	withProps({
		googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GoogleMaps}&v=3.exp&libraries=geometry,drawing,places`,
		loadingElement: <div style={{ height: `100vh` }} />,
		containerElement: <div style={{ height: `100vh` }} />,
		mapElement: <div style={{ height: `100vh` }} />
	}),
	lifecycle({
		componentDidMount() {
			const refs = {};

			this.setState({
				bounds: null,
				center: ubicacionArgentina,
				markers: [],
				onMapMounted: ref => {
					refs.map = ref;
				},
				onBoundsChanged: () => {
					this.setState({
						bounds: refs.map.getBounds(),
						center: refs.map.getCenter()
					});
				},
				onSearchBoxMounted: ref => {
					refs.searchBox = ref;
				},
				onPlacesChanged: () => {
					const places = refs.searchBox.getPlaces();
					const bounds = new google.maps.LatLngBounds();

					places.forEach(place => {						
						if (place.geometry.viewport) {
							bounds.union(place.geometry.viewport);
						} else {
							bounds.extend(place.geometry.location);
						}
					});
					const nextMarkers = places.map(place => ({
						position: place.geometry.location
					}));
					const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

					this.setState({
						center: nextCenter,
						markers: nextMarkers
					});
				}
			});
		}
	}),
	withStateHandlers(() => ({
		isOpen: false,
		index: null
	  }), {
			onToggleOpen: ({ isOpen }) => index => ({				
				isOpen: !isOpen,
				index: index
			})
		}, {
			onToggleClose: ({ isOpen }) => () => ({
				isOpen: !isOpen,
				index: null
			})
		},
	),
	withScriptjs,
	withGoogleMap
)(props => (
	<GoogleMap ref={props.onMapMounted} defaultZoom={4.5} center={props.center} onBoundsChanged={props.onBoundsChanged}>
		<SearchBox
			ref={props.onSearchBoxMounted}
			bounds={props.bounds}
			controlPosition={google.maps.ControlPosition.TOP_LEFT}
			onPlacesChanged={props.onPlacesChanged}
		>
			<input
				type='text'
				placeholder='Buscar lugar'
				style={{
					boxSizing: `border-box`,
					border: `1px solid transparent`,
					width: `200px`,
					height: `32px`,
					marginTop: `60px`,
					padding: `0 12px`,
					borderRadius: `3px`,
					boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
					fontSize: `14px`,
					outline: `none`,
					textOverflow: `ellipses`
				}}
			/>
		</SearchBox>
		{props.markers.map((marker, index) => (
			<Marker key={index} position={marker.position} onClick={() => props.onToggleOpen(index)}>
			{props.isOpen && props.index === index &&
				<InfoWindow 
					onCloseClick={() => props.onToggleClose}
				>
					<p>Aqui va la info del sitio</p>
				</InfoWindow>
			}
		</Marker>
		))}
	</GoogleMap>
));

export default Map;
