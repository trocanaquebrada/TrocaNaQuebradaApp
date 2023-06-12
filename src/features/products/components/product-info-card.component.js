import React, { useContext, useState, useEffect } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
/*import available from "../../assets/available";*/
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../utils/firebase/firebase.utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  ProductCard,
  ProductCardCover,
  Info,
  Section,
  SectionEnd,
  Rating,
  Icon,
  Address,
} from "./product-info-card.styles";

export const ProductInfoCard = ({ product = {} }) => {
  const {
    name,
    /*icon,*/
    photos,
    address,
    rating = 4,
    placeId,
    /*isAvailable = true,*/
  } = product;

  //fazer uma função para transformar o address em uma função de localização relativa
  const ratingArray = Array.from(new Array(Math.floor(rating)));
  return (
    <ProductCard elevation={5}>
      <ProductCardCover key={placeId} source={{ uri: photos[0] }} />
      <Info>
        <Text variant="label">{name}</Text>
        <Section>
          <Rating>
            {ratingArray.map((_, i) => (
              <SvgXml
                key={`star-${placeId}-${i}`}
                xml={star}
                width={20}
                height={20}
              />
            ))}
          </Rating>
          {/*<SectionEnd>
            {isAvailable && <Available xml={available} width={20} height={20} />}
            </SectionEnd>*/}
        </Section>
        {/* <Address>{address}</Address> */}
      </Info>
    </ProductCard>
  );
};
