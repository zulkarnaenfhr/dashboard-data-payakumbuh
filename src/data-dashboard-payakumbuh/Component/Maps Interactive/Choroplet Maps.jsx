import React, { Component } from "react";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { payakumbuhBarat, payakumbuhSelatan, payakumbuhTimur, payakumbuhUtara, limposiTigoNagoro, center } from "./Charlote Maps Data";
import "./ChoropletMaps.css";

class ChoropletMaps extends Component {
    render() {
        return (
            <div id="choropletMaps-container" data-aos="fade-up" data-aos-delay="500" className="container">
                <MapContainer
                    center={center}
                    zoom={12}
                    style={{
                        width: "485px",
                        height: "400px",
                    }}
                >
                    <TileLayer
                        url="https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=aygYUUBoyfx9IDsjauP0"
                        attribution={`<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`}
                    />
                    <Polygon color="cadetblue" fillColor="cadetblue" positions={limposiTigoNagoro}>
                        <Popup>Limposi Tigo Nagaro</Popup>
                    </Polygon>
                    <Polygon color="lightcoral" fillColor="lightcoral" positions={payakumbuhBarat}>
                        <Popup>Payakumbuh Barat</Popup>
                    </Polygon>
                    <Polygon color="blue" fillColor="blue" positions={payakumbuhSelatan}>
                        <Popup>Payakumbuh Selatan</Popup>
                    </Polygon>
                    <Polygon color="purple" fillColor="purple" positions={payakumbuhTimur}>
                        <Popup>Payakumbuh Timur</Popup>
                    </Polygon>
                    <Polygon color="mediumseagreen" fillColor="mediumseagreen" positions={payakumbuhUtara}>
                        <Popup>Payakumbuh Utara</Popup>
                    </Polygon>
                </MapContainer>
            </div>
        );
    }
}

export default ChoropletMaps;
