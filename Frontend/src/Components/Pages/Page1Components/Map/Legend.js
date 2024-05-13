import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
// import "../../../../index.css";

const popPerc = [0, 5, 10, 20, 30, 40];

function getColor(d) {
    return  d > 40 ? "#e93e3a" : 
            d > 30 ? "#ed683c" : 
            d > 20 ? "#f3903f" : 
            d > 10 ? "#fdc70c" : 
            d > 5 ? "#fff33b" : 
					"#ffffa0";
};

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
