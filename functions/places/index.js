/* const { mocks, addMockImage } = require("./mock");
const url = require("url");

module.exports.placesRequest = (request, response) => {
  const { location } = url.parse(request.url, true).query;
  const data = mocks[location];
  if (data) {
    data.results = data.results.map(addMockImage);
  }

  response.json(data);
};
 */
const { locationPlaces } = require("./geocode").locations;
const url = require("https://maps.googleapis.com/maps/api/js?AIzaSyAEjVsERT9soo-WjVJRWKn0EYGSjzz07_o&callback=initMap");

module.exports.placesRequest = (request, response) => {
  const { location } = url.parse(request.url, true).query;
  const data = locationPlaces[location];
  console.log(data);
  if (data) {
    data.results = data.results.map();
  }

  response.json(data);
};
