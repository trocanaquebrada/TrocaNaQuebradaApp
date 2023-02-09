import React from "react";
import styled from "styled-components";
import { Text } from "react-native";
import { Card } from "react-native-paper";

const ProductCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const ProductCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const Title = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  padding: ${(props) => props.theme.space[3]};
  color: ${(props) => props.theme.colors.text.primary};
`;

export const ProductInfoCard = ({ product = {} }) => {
  const {
    name = "Some Product",
    /*icon,*/
    photos = [
      "https://cdn.shopify.com/s/files/1/0649/5223/8331/products/conjunto-fitness-legging-e-top-degrade-conjunto-de-academia-feminino-roupa-de-academia-utilidadesweb01-rosa-pink-p-152991_600x600_crop_center.jpg?v=1670868851",
    ],
    /*address = "1km",
    avaiable = true,
    rating = 4,*/
  } = product;

  return (
    <ProductCard elevation={5}>
      <ProductCardCover key={name} source={{ uri: photos[0] }} />
      <Title>{name}</Title>
    </ProductCard>
  );
};
