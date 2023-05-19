/* const { locations: locationsMock } = require("./geocode.mock");
const url = require("url");

module.exports.geocodeRequest = (request, response) => {
  const { city } = url.parse(request.url, true).query;
  const locationMock = locationsMock[city.toLowerCase()];

  response.json(locationMock);
};*/
//const { locations } = require("./geocode").locations;
const url = require("https://maps.googleapis.com/maps/api/js?AIzaSyAEjVsERT9soo-WjVJRWKn0EYGSjzz07_o&callback=initMap");

module.exports.geocodeRequest = (request, response) => {
  const { city } = url.parse(request.url, true).query;
  const location = [city.toLowerCase()];

  response.json(location);
};
