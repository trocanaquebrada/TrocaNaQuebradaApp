const functions = require("firebase-functions");
const { geocodeRequest } = require("./geocode/index");
const { placesRequest } = require("./places/index");

exports.geocode = functions.https.onRequest((request, response) => {
  geocodeRequest(request, response);
});

exports.placesNearby = functions.https.onRequest((request, response) => {
  placesRequest(request, response);
});
