import React, { useContext, useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components";

import { ProductsContext } from "../../../resources/products/products.context";
import { LocationContext } from "../../../resources/location/location.context";
import { Search } from "../components/search.component";
import { db } from "../../../utils/firebase/firebase.utils";
import * as Location from "expo-location";
import {
  getFirestore,
  doc,
  addDoc,
  getDocs,
  getDoc,
  collection,
} from "firebase/firestore";

import {
  createUserDocumentFromAuth,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;
console.log("MapScreen");
export const MapScreen = () => {
  const { location } = useContext(LocationContext);
  const { products = [] } = useContext(ProductsContext);

  const [latDeltaViewport, setLatDeltaViewport] = useState(0);

  const [mapRegion, setMapRegion] = useState(null);
  const [marker, setMarker] = useState([]);

  useEffect(() => {
    (async () => {
      /*       const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("A permissão para acessar o local foi negada");
        return;
      }
      const locationUser = await Location.getCurrentPositionAsync({}); */
      /*       console.log("localização do usuario= ", locationUser); */

      const auth = getAuth();
      const userRef = auth.currentUser.uid;
      const userDoc = await getDoc(doc(db, "users", userRef));
      const userLocation = {
        lat: userDoc.data().lat,
        lng: userDoc.data().lng,
      };
      if (userLocation) {
        const northeastLat = userLocation.lat;
        const southwestLat = userLocation.lat;
        const latDelta = northeastLat - southwestLat;

        setLatDeltaViewport(latDelta);
        setMapRegion({
          latitude: userLocation.lat,
          longitude: userLocation.lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.0421,
        });
      }

      const productCollectionRef = collection(db, "Product");
      const productsCollection = await getDocs(productCollectionRef);
      const productsData = productsCollection.docs.map((doc) => {
        const { nameProduct, lat, lng, userRef, id, address, photos } =
          doc.data();
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
      setMarker(
        productsData.map((data) => ({
          name: data.name,
          latitude: data.latitude,
          longitude: data.longitude,
          longitudeDelta: 0.0421,
        }))
      );
    })();
  }, [marker]);

  return (
    <>
      <Search />
      <Map
        region={mapRegion}
        showsUserLocation
        loadingEnabled
        //mapType="terrain"
      >
        {marker.map((m) => {
          return (
            <Marker
              coordinate={{
                latitude: m.latitude,
                longitude: m.longitude,
              }}
              key={Math.random().toString()}
            />
          );
        })}
      </Map>
    </>
  );
};
