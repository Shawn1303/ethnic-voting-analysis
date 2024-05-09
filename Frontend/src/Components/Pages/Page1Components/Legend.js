import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "../../../index.css";

const popPerc = [0, 5, 10, 20, 30, 40];

function getColor(d) {
    return  d > 40 ? "#000094" : 
            d > 30 ? "#11349e" : 
            d > 20 ? "#33559e" : 
            d > 10 ? "#5977aa" : 
            d > 5 ? "#7799be" : 
					"#9dbad4";
};
// #0b5394
// #23649e
// #3b75a9
// #5486b4
// #6c97be
// #85a9c9
// #9dbad4
// #b5cbde
// #cedce9
// #e6edf4
// #ffffff

function Legend() {
  const map = useMap();  

    useEffect(() => {
        const legendControl = L.control({ position: "bottomright" });
        legendControl.onAdd = function() {
            const div = L.DomUtil.create("div", "info legend");
            return div;
        };
        legendControl.addTo(map);
        return () => {
            legendControl.remove();
        };
    }, [map]);

    return (
        <div className="legend-container" style={{ position: 'absolute', bottom: '50px', right: '10px', zIndex: 1000 }}>
            <div className="info legend">
            {popPerc.map((p, index) => {
                const from = popPerc[index];
                const to = popPerc[index + 1];
                return (
                    <div key={index}>
                        <i style={{ background: getColor(from + 1) }}></i>
                        {from}{to ? `% - ${to}%` : '%+'}
                    </div>
                );
            })}
      </div>
    </div>
    );
}
export default Legend;
