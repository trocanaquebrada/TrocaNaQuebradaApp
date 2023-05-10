import React, { useContext, useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components";

import { ProductsContext } from "../../../resources/products/products.context";
import { LocationContext } from "../../../resources/location/location.context";
import { Search } from "../components/search.component";

import * as Location from 'expo-location';

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = () => {
  const { location } = useContext(LocationContext);
  const { products = [] } = useContext(ProductsContext);

  const [latDelta, setLatDelta] = useState(0);

  const { lat, lng, viewport } = location;
  /*   const [setLocation] = useState(null)
    const [marker, setMarker] = useState([]); */

  useEffect(() => {
    async () => {
      const northeastLat = viewport.northeast.lat;
      const southwestLat = viewport.southwest.lat;

      setLatDelta(northeastLat - southwestLat);
      /* 
            let { status } = await Location.requestForegroundPermissionsAsync();
      
            if (status !== 'granted') {
              console.log('A permissão para acessar o local foi negada');
              return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
       */
    }
  }, [location, viewport]);

  /*   const handleNewMarker = (coordinate) => {
      setMarker([...marker, coordinate]);
      console.log(marker)
    }; */

  return (
    <>
      <Search />
      <Map
        // onPress={(e) => handleNewMarker(e.nativeEvent.coordinate)}
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
      //showsUserLocation
      // loadingEnabled
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
        {/*  {marker.length > 0 &&
          marker.map((m) => {
            return (
              <Marker coordinate={m} key={Math.random().toString()} />
            );
          })} */}
      </Map>
    </>
  );
};



/* mock 
latitude: 37.42597730214824,
          longitude: -122.0856026405,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421, */
