import camelize from "camelize";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase.utils";

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
    const { nameProduct, lat, lng, userRef, id, address, photos } = doc.data();
    return {
      name: nameProduct || "",
      address: address || "",
      latitude: lat || "",
      longitude: lng || "",
      ref: userRef || "",
      id: doc.id || "",
      photos: photos || [
        "https://cdn.shopify.com/s/files/1/0649/5223/8331/products/conjunto-fitness-legging-e-top-degrade-conjunto-de-academia-feminino-roupa-de",
      ],
    };
  });
  console.log(productsData);
  return productsData.json();
};
//console.log(productsRequest());
export const productsTransform = ({ results = [] }) => {
  const mappedResults = results.map((product) => {
    return {
      ...product,
      address: product.vicinity,
    };
  });

  return camelize(mappedResults);
};
