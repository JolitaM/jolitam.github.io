// Kodas inicijuojantis žemėlapio objektą div elemente map
var map = new maplibregl.Map({
  container: "map",
  style: "styles/overview.json",
  hash: true,
  center: [24.000, 55.073],
  zoom: 6,
});

// Add zoom and rotation controls to the map.
map.addControl(new maplibregl.NavigationControl());

// Funkcija skirta žemėlapių stilių keitimui
function switchBgLayers(layerName) {
  var layer;

  // Pagal funkcijos parametrą parenkamas žemėlapio stilius
  if (layerName === "Topografinis") {
    layer = "https://basemap.startupgov.lt/vector/styles/bright/style.json";
  } else if (layerName === "Apžvalginis") {
    layer = "https://basemap.startupgov.lt/vector/styles/positron/style.json";
  } else {
    layer = "styles/overview.json";
  }

  // maplibre setStyle funkcija pakeičia žemėlapio stilių
  map.setStyle(layer);
}
