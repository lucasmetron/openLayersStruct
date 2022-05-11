import { Circle as CircleStyle, Fill, Stroke, Style, Icon } from "ol/style";

const styles = {
    danger: new Style({
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({ color: "#f5363680" }),
        stroke: new Stroke({ color: "#f53636", width: 2 }),
      }),
    }),
    warning: new Style({
      image: new CircleStyle({
        radius: 5,
        fill: new Fill({ color: "#ffa20d80" }),
        stroke: new Stroke({ color: "#ffa20d", width: 2 }),
      }),
    }),
    line: new Style({
      stroke: new Stroke({ color: "#00FF00", width: 2 }),
    }),
  
    polygon:new Style({
      stroke: new Stroke({ color: "#00FF00", width: 2 }),
      fill: new Fill({color: '#d240ff80'})
    }),
    citie_icon:new Style({
      image: new Icon({
        scale: 0.3,
        src: require('enderecodaimagem.png'),
      })
    })
  };

  export default styles