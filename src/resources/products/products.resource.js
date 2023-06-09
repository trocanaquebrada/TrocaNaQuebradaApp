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
    const { nameProduct, lat, lng, userRef, placeId, address, photos } =
      doc.data();
    return {
      name: nameProduct || "",
      address: address || "",
      latitude: lat || "",
      longitude: lng || "",
      ref: userRef || "",
      placeId: doc.id || "",
      photos: photos || [
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fadoropapel.com.br%2F2021%2F05%2Fvoce-realmente-conhece-o-papel-veja-4-livros-sobre-o-material%2F&psig=AOvVaw0MqHvb0xQyGqzJsQ978dDT&ust=1686433213262000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCJi737aTt_8CFQAAAAAdAAAAABAE",
      ],
    };
  });
  console.log(productsData);
  return productsData;
};

export const productsTransform = ({ results = [] }) => {
  const mappedResults = results.map((product) => {
    return {
      ...product,
      address: product.vicinity,
    };
  });

  return camelize(mappedResults);
};
