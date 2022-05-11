import { transform } from "ol/proj";

export const transformCords = (points)=>{
    for (var i = 0; i < points.length; i++) {
        points[i] = transform(points[i], "EPSG:4326", "EPSG:3857");
      }
    
    return points
} ;