import { useEffect } from "react";
import OlMap from "ol/Map";
import olView from "ol/View";
import { Tile } from "ol/layer";
import { OSM } from "ol/source";
import { transform } from "ol/proj";
import './style.css'
import 'ol/ol.css'

const Map = () => {
  const startMap = () => {
    new OlMap({
      target: "olmap",
      layers: [
        new Tile({
          source: new OSM(),
        }),
      ],
      view: new olView({
        center: transform([-60.3319245, -15.2533513], "EPSG:4326", "EPSG:3857"),
        zoom: 4,
      }),
    });
  };

  useEffect(() => {
    startMap();
  }, []);

  return <div id="olmap" className="olmap"></div>;
};

export default Map;
