import React, { useContext, useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components";

import { ProductsContext } from "../../../resources/products/products.context";
import { LocationContext } from "../../../resources/location/location.context";
import { Search } from "../components/search.component";

import * as Location from "expo-location";
import {
  getFirestore,
  doc,
  addDoc,
  setDoc,
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

export const MapScreen = () => {
  const { location } = useContext(LocationContext);
  const { products = [] } = useContext(ProductsContext);

  const [latDeltaViewport, setLatDeltaViewport] = useState(0);

  const [mapRegion, setMapRegion] = useState(null);
  const [marker, setMarker] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("A permissão para acessar o local foi negada");
        return;
      }
      const locationUser = await Location.getCurrentPositionAsync({});
      /*       console.log("localização do usuario= ", locationUser); */

      const db = getFirestore();
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
    })();
  }, []);
  //trazer os produtos e cadastrar os markers dele aqui
  /*   const handleNewMarker = (latDelta) => {
    setMarker([...marker, latDelta]);
    console.log(marker);
  }; */
  //precisa levar o marker para a pagina de produto
  return (
    <>
      <Search />
      <Map
        region={mapRegion}
        showsUserLocation
        loadingEnabled
        //mapType="terrain"
      >
        {products.map((product) => {
          return (
            <Marker
              key={product.name}
              title={product.name}
              coordinate={{
                latitude: product.geometry.location.lat,
                longitude: product.geometry.location.lng,
              }}
            />
          );
        })}
        {marker.length > 0 &&
          marker.map((m) => {
            return <Marker coordinate={m} key={Math.random().toString()} />;
          })}
      </Map>
    </>
  );
};
