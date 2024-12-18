// Kodas inicijuojantis žemėlapio objektą div elemente map
var map = new maplibregl.Map({
  container: "map",
  style: "styles/overview.json",
  hash: true,
  center: [22.981, 55.2],
  zoom: 6.75,
});

// Add zoom and rotation controls to the map.
map.addControl(new maplibregl.NavigationControl());


// Funkcija skirta žemėlapių stilių keitimui
function switchBgLayers(layerName) {
  var layer;

  // Pagal funkcijos parametrą parenkamas žemėlapio stilius
  if (layerName === "Gamtinis") {
    layer = "styles/outdoor.json";
  } else if (layerName === "Topografinis") {
    layer = "styles/topo.json";
  } else {
    layer = "styles/overview.json";
  }

  // maplibre setStyle funkcija pakeičia žemėlapio stilių
  map.setStyle(layer);
document.getElementById("layerSwitch1").checked = false;
  document.getElementById("layerSwitch2").checked = false;
   document.getElementById("layerSwitch3").checked = false;

  setTimeout(() => {
    loadThematicLayers();
  }, "1000");
}

map.on("load", () => {
  console.log("Žemėlapis užsikrovė");

  map.addSource("my-data", {
    type: "geojson",
    data: {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [24.007, 55.073],
      },
      properties: {
        title: "Mapbox DC",
        "marker-symbol": "monument",
      },
    },
  });

  loadThematicLayers();
});

function loadThematicLayers() {
  // Pridedami žemėlapio šaltiniai kaip WMS el. paslaugos
  map.addSource("road_map_LT_source", {
    type: "raster",
    tiles: [
      "http://localhost/qgisserver/road_map_LT?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=road_map_lt",
    ],
    tileSize: 256,
  });

  map.addSource("statistics_source", {
    type: "raster",
    tiles: [
      "http://localhost/qgisserver/vda_gyventojai?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=vda_gyventojai_lt",
    ],
    tileSize: 256,
  });

  map.addSource("vietoves_map_LT_source", {
    type: "raster",
    tiles: [
      "http://localhost/qgisserver/vietoves_map_LT?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=Vietoviu_zemelapis",
    ],
    tileSize: 256,
  });

  // Pridedami žemėlapio sluoksniai iš žemėlapio šaltinių
  map.addLayer({
    id: "road_map_LT_wms",
    type: "raster",
    source: "road_map_LT_source",
    layout: {
      visibility: "none",
    },
    paint: {},
  });

  map.addLayer({
    id: "statistics_wms",
    type: "raster",
    source: "statistics_source",
    layout: {
      visibility: "none",
    },
    paint: {},
  });

  map.addLayer({
    id: "vietoves_map_LT_wms",
    type: "raster",
    source: "vietoves_map_LT_source",
    layout: {
      visibility: "none",
    },
    paint: {},
  });
}

function toggleLayers(layerId) {
  if (map.getLayoutProperty(layerId, "visibility") == "none") {
    map.setLayoutProperty(layerId, "visibility", "visible");
  } else {
    map.setLayoutProperty(layerId, "visibility", "none");
  }
}

map.addControl(
  new maplibreGLMeasures.default({
    lang: {
      areaMeasurementButtonTitle: "Matuoti plotą",
      lengthMeasurementButtonTitle: "Matuoti ilgį",
      clearMeasurementsButtonTitle: "Išvalyti matavimus",
    },
    units: "metric", //or metric, the default
    unitsGroupingSeparator: " ", // optional. use a space instead of ',' for separating thousands (3 digits group). Do not send this to use the browser default
    style: {
      text: {
        radialOffset: 0.9,
        letterSpacing: 0.05,
        color: "#D20C0C",
        haloColor: "#fff",
        haloWidth: 0,
        font: "Noto Sans Regular",
      },
      common: {
        midPointRadius: 3,
        midPointColor: "#D20C0C",
        midPointHaloRadius: 5,
        midPointHaloColor: "#FFF",
      },
      areaMeasurement: {
        fillColor: "#D20C0C",
        fillOutlineColor: "#D20C0C",
        fillOpacity: 0.01,
        lineWidth: 2,
      },
      lengthMeasurement: {
        lineWidth: 2,
        lineColor: "#D20C0C",
      },
    },
  }),
  "bottom-right",
);

map.on("click", (e) => {
  console.log(e.lngLat);
});
async function identifyLayer() {
  const url =
    "http://localhost/qgisserver/vda_gyventojai?QUERY_LAYERS=gyventoju_zemelapis&INFO_FORMAT=application/json&REQUEST=GetFeatureInfo&SERVICE=WMS&VERSION=1.3.0&FORMAT=image/png&STYLES=&TRANSPARENT=true&LAYERS=gyventoju_zemelapis&FILTER=&FEATURE_COUNT=1000&FI_POINT_TOLERANCE=10&FI_LINE_TOLERANCE=10&FI_POLYGON_TOLERANCE=10&WITH_GEOMETRY=true&X=50&Y=50&WIDTH=101&HEIGHT=101&SRS=EPSG%3A3346&BBOX=501365.73187745%2C6083067.148868525%2C502945.66660234344%2C6084647.083593419";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}




/*mastelis*/

let scale = new maplibregl.ScaleControl({
  maxWidth: 80,
  unit: 'metric'
});
map.addControl(scale, 'bottom-right');
scale.setUnit('metric');

map.addControl(new maplibregl.FullscreenControl({container: document.querySelector('body')}));


map.addControl(new maplibregl.GeolocateControl({
  positionOptions: {
      enableHighAccuracy: true
  },
  trackUserLocation: true
}));


