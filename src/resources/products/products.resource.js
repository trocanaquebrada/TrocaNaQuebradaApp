import camelize from "camelize";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";
import { getAuth } from "firebase/auth";
import * as geolib from "geolib";

export const productsRequest = async () => {
  /*   const res = await fetch(
    `https://us-central1-trocanaquebrada-f3b2b.cloudfunctions.net/placesNearby/us-central1/placesNearby?location=${location}`
  ); */
  const res = await fetch(
    "https://maps.googleapis.com/maps/api/js?AIzaSyAEjVsERT9soo-WjVJRWKn0EYGSjzz07_o&callback=initMap"
  );

  const productCollectionRef = collection(db, "Product");
  const productsCollection = await getDocs(productCollectionRef);
  const productsData = productsCollection.docs.map((doc) => {
    const { nameProduct, lat, lng, userRef, placeId, address, photos, value } =
      doc.data();
    return {
      name: nameProduct || "",
      value: value || "",
      address: address || "",
      latitude: lat || "",
      longitude: lng || "",
      ref: userRef || "",
      placeId: doc.id || "",
      photos: photos || ["https://picsum.photos/300/300"],
    };
  });
  const auth = getAuth();
  const userRef = auth.currentUser.uid;
  const userDoc = await getDoc(doc(db, "users", userRef));
  const userLocation = {
    name: userDoc.data().displayName,
    latitude: userDoc.data().lat,
    longitude: userDoc.data().lng,
  };
  const distances = productsData.map((result) => {
    const distance = geolib.getDistance(
      { latitude: userLocation.latitude, longitude: userLocation.longitude },
      { latitude: result.latitude, longitude: result.longitude }
    );

    const formattedDistance =
      distance < 1000
        ? `${distance} metros`
        : `${(distance / 1000).toFixed(1)} km`;

    return {
      formattedDistance: formattedDistance,
    };
  });

  const mergedData = productsData.map((product, index) => {
    return {
      ...product,
      ...distances[index],
    };
  });

  return mergedData;
};

/* export const productsDistance = async () => {
  const productsData = await productsRequest();
  const mappedResults = productsData.map((doc) => {
    const { latitude, longitude, address } = doc;
    return {
      address: address,
      latitude: latitude,
      longitude: longitude,
    };
  });
  const auth = getAuth();
  const userRef = auth.currentUser.uid;
  const userDoc = await getDoc(doc(db, "users", userRef));
  const userLocation = {
    name: userDoc.data().displayName,
    latitude: userDoc.data().lat,
    longitude: userDoc.data().lng,
  };
  const distances = mappedResults.map((result) => {
    const distance = geolib.getDistance(
      { latitude: userLocation.latitude, longitude: userLocation.longitude },
      { latitude: result.latitude, longitude: result.longitude }
    );

    const formattedDistance =
      distance < 1000
        ? `${distance} metros`
        : `${(distance / 1000).toFixed(1)} km`;

    return {
      //distance: distance,
      formattedDistance,
    };
  });

  return {
    //mappedResults: mappedResults,
    distances: distances,
  };
};
 */
