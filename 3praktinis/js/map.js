// Kodas inicijuojantis žemėlapio objektą div elemente map
var map = new maplibregl.Map({
  container: "map",
  style: "styles/default_style.json",
  hash: true,
  center: [24.007, 55.073],
  zoom: 6,
});

// Add zoom and rotation controls to the map.
map.addControl(new maplibregl.NavigationControl());

// Funkcija skirta žemėlapių stilių keitimui
function switchBgLayers(layerName) {
  var layer;

  // Pagal funkcijos parametrą parenkamas žemėlapio stilius
  if (layerName === "Gatvės") {
    layer = "https://basemap.startupgov.lt/vector/styles/bright/style.json";
  } else if (layerName === "Pilkas") {
    layer = "https://basemap.startupgov.lt/vector/styles/positron/style.json";
  } else {
    layer = "styles/default_style.json";
  }

  // maplibre setStyle funkcija pakeičia žemėlapio stilių
  map.setStyle(layer);
}
