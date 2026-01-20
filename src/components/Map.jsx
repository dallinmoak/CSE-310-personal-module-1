import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { useRef, useEffect } from "react";

const MapPath = ({ pathData }) => {
  const pathRef = useRef(null);

  useEffect(() => {
    if (!pathRef.current || !pathData) return;

    const graphicsLayer = new GraphicsLayer();

    const pathGraphic = new Graphic({
      geometry: {
        type: "polyline",
        paths: [pathData],
      },
      symbol: {
        type: "simple-line",
        color: [226, 119, 40],
        width: 4,
      },
    });

    graphicsLayer.add(pathGraphic);

    const map = new Map({
      basemap: "topo-vector",
      layers: [graphicsLayer],
    });

    const mapView = new MapView({
      container: pathRef.current,
      map: map,
    });

    mapView.when(() => {
      mapView.goTo(pathGraphic.geometry.extent.expand(1.5));
    });

    return () => {
      if (mapView) {
        mapView.destroy();
      }
    };
  }, [pathData]);

  return <div style={{ width: "100%", height: "400px" }} ref={pathRef}></div>;
};

export default MapPath;
