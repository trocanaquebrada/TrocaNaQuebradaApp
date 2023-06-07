//const url = require("https://maps.googleapis.com/maps/api/js?AIzaSyAEjVsERT9soo-WjVJRWKn0EYGSjzz07_o&callback=initMap");
const url = require("url");
const functions = require("firebase-functions");

module.exports.geocodeRequest = (request, response, client) => {
  const { city } = url.parse(request.url, true).query;
  const location = [city.toLowerCase()];
  client
    .geocode({
      params: {
        address: city,
        key: functions.config().google.key,
      },
      timeout: 1000,
    })
    .then((res) => {
      return response.json(res.data);
    })
    .catch((e) => {
      response.status(400);
      return response.send(e.response.data.error_message);
    });
};
