import React from 'react'
import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'






export default function Leaflet(data, popup) {

    let coord = [];
        //data= '-31.13131 -34.55'

    coord.push(parseFloat(data.data.split(' ')[0]))    
    coord.push(parseFloat(data.data.split(' ')[1]))
    
 console.log('Coord', coord)
 

    // center= {[51.505, -0.09]}
  return (
 
        <MapContainer center={coord} zoom={5} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={coord}>
                <Popup>
                    Evento Concertek
                </Popup>
            </Marker>
        </MapContainer>
    
    
  )
}
