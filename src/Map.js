import React from 'react'
import numeral from 'numeral';
import { MapContainer, Marker, Popup, TileLayer, useMap, Circle, CircleMarker } from 'react-leaflet'
import './Map.css'

const casesTypeColors = {
  cases:{
  hex: '#cc1034',
  multiplier: 800
  },
  recovered:{
  hex: '#7dd71d',
  multiplier: 1200,
  },
  cases:{
  hex: '#fb4443',
  multiplier: 2000
  }
  } 

const Map = ({center, zoom, countries}) => {
  const redOptions = { color: 'red' }
  const fillBlueOptions = { fillColor: 'blue' }


  // Draw circle on the map
  const showDataOnMap = (data, caseType='cases') =>{
    data.map(country =>{
      <Circle
        center={[data.countryInfo.lat, data.countryInfo.long]}
        fillOpacity={0.4}
        fillColor={casesTypeColors[caseType].hex}
      >

      </Circle>
    })
  }
  return (
    <div className='map'>
      <MapContainer className='map__container' center={center} zoom={zoom} scrollWheelZoom={true}>
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  <div>
  <Circle center={center} pathOptions={fillBlueOptions} radius={200} />
    <CircleMarker center={center} pathOptions={redOptions} radius={20}>
      <Popup><div><img src={countries.flag}/></div></Popup>
    </CircleMarker>
  </div>
  </MapContainer>   
    </div> 
  )
}

export default Map