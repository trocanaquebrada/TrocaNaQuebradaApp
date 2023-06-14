import camelize from "camelize";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
import { getAuth } from "firebase/auth";

export const locationRequest = async (searchTerm) => {
  /*   const res = await fetch(
    `https://us-central1-trocanaquebrada-f3b2b.cloudfunctions.net/geocode?city=${searchTerm}`
  ); */
  const res = await fetch(
    "https://maps.googleapis.com/maps/api/js?AIzaSyAEjVsERT9soo-WjVJRWKn0EYGSjzz07_o&callback=initMap"
  );

  console.log(res);

  return res;
};

export const locationTransform = (result) => {
  console.log(result);
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
