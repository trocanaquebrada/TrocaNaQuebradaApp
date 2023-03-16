import React, { useContext, useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import styled from "styled-components";

import { ProductsContext } from "../../../resources/products/products.context";
import { LocationContext } from "../../../resources/location/location.context";
import { Search } from "../components/search.component";

const Map = styled(MapView)`
  height: 100%;
  width: 100%;
`;

export const MapScreen = () => {
  const { location } = useContext(LocationContext);
  const { products = [] } = useContext(ProductsContext);

  const [latDelta, setLatDelta] = useState(0);

  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <>
      <Search />
      <Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.02,
        }}
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
      </Map>
    </>
  );
};
