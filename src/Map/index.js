// parei no 24:18

import { useEffect } from "react";
import OlMap from "ol/Map";
import olView from "ol/View";
import { Tile } from "ol/layer";
import { OSM } from "ol/source";
import "./style.css";
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import { Point, MultiPoint, LineString, Polygon } from "ol/geom";
import styles from "./styleLayer";
import {transformCords} from './utils'
import { transform } from "ol/proj";


const Map = () => {

  // iniciando o vectorsource antes de todos as linhas, ponto e poligonos
  const vectorSourcer = new VectorSource();

  // aqui é onde jogamos todo nossos pontos 
  const vectorLayer = new VectorLayer({
    source: vectorSourcer,
    style: (feature) => {
      // estamos pegando o parametro da feature, pra procurar um estilo que bata com esse parametro, ex: type: danger === style: danger
      return styles[feature.get("type")];
    },
  });

  // o transform serve para ajustar a lat e long como o modelo de visualização "EPSG:4326", "EPSG:3857"
  const point1 = transform([-60.5, -15.5], "EPSG:4326", "EPSG:3857")
  const point2 = transform([-60.5, -10.5], "EPSG:4326", "EPSG:3857")

  const points_line = [
    [-65.5, -8.0],
    [-70.0, -8.0],
    [-60.5, -20.0],
  ];

  const points_polygon = [[-50.5, -8.0],[-40.5, -8.0],[-40.5, -15.0],[-50.5, -15.0]] 

  const feature_points = [
    new Feature({
      geometry: new Point( point1),
      type: "danger",
    }),
    new Feature({
      geometry: new Point(point2),
      type: "warning",
    }),
  ]

  const feature_line = [
    new Feature({
      geometry: new LineString(transformCords(points_line)),
      type: "line",
    }),
  ]

  const feature_polygon = [
    new Feature({
      geometry: new Polygon([transformCords(points_polygon)]),
      type: "polygon",
    }),
  ]
  
  // função add as features no source que seram add como layers 
  vectorSourcer.addFeatures(feature_points)
  vectorSourcer.addFeatures(feature_line)
  vectorSourcer.addFeatures(feature_polygon)

  const startMap = () => {
    const olMap = new OlMap({
      target: "olmap",
      layers: [
        // aqui ficas as layers e a primeira layer é o proprio mapa
        new Tile({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new olView({
        center: transform([-60.3319245, -15.2533513], "EPSG:4326", "EPSG:3857"),
        zoom: 4.5,
      }),
    });

    // a função abaixo serve para executar função de buscar dados dos pontos/linhas/poligonos, quando o mapa estiver carregado
    // olMap.once('rendercomplete' , ()=>{
    //   getData()
    // })
  };

  useEffect(() => {
    startMap();
  }, []);

  return <div id="olmap" className="olmap"></div>;
};

export default Map;
