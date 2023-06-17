import React, { useContext, useState, useEffect } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
/*import available from "../../assets/available";*/

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
    formattedDistance,
    address,
    rating = 4,
    placeId,
    /*isAvailable = true,*/
  } = product;

  const ratingArray = Array.from(new Array(Math.floor(rating)));
  return (
    <ProductCard elevation={5}>
      <ProductCardCover key={placeId.id} source={{ uri: photos[0] }} />
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
        <Address>{formattedDistance}</Address>
      </Info>
    </ProductCard>
  );
};
