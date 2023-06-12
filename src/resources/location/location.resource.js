import camelize from "camelize";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
import { getAuth } from "firebase/auth";
console.log("resource");
export const locationRequest = async (searchTerm) => {
  console.log("locationRequest");
  const res = await fetch(
    `https://us-central1-trocanaquebrada-f3b2b.cloudfunctions.net/geocode?city=${searchTerm}`
  );
  const auth = getAuth();
  const userRef = auth.currentUser.uid;
  const userDoc = await getDoc(doc(db, "users", userRef));
  const userLocation = {
    lat: userDoc.data().lat,
    lng: userDoc.data().lng,
  };
  console.log(userLocation);
  return userLocation;
};

export const locationTransform = (result) => {
  console.log(result);
  const formattedResponse = camelize(result);
  const { geometry = {} } = formattedResponse.results[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
