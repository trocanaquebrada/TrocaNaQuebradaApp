import React from "react";
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
    photos = [
      "https://cdn.shopify.com/s/files/1/0649/5223/8331/products/conjunto-fitness-legging-e-top-degrade-conjunto-de-academia-feminino-roupa-de-academia-utilidadesweb01-rosa-pink-p-152991_600x600_crop_center.jpg?v=1670868851",
    ],
    address = "1km de distancia",
    rating = 4,
    placeId,
    /*isAvailable = true,*/
  } = product;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <ProductCard elevation={5}>
      <ProductCardCover key={name} source={{ uri: photos[0] }} />
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
        <Address>{address}</Address>
      </Info>
    </ProductCard>
  );
};
