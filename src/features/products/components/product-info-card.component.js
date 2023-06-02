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
//console.log("product-info-card fora");

const productCollectionRef = collection(db, "Product");

const searchProducts = async () => {
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
  //console.log(productsData);
  return productsData;
};

//console.log("searchProduct");
//searchProducts();
//console.log(searchProducts());
export const ProductInfoCard = ({ products = {} }) => {
  console.log("product-info-card dentro");
  //const [products, setProducts] = useState([]);

  const getProductsData = async () => {
    try {
      const products = await searchProducts();

      const { name, photos, address, rating = 4, placeId } = products;

      console.log(products);
    } catch (error) {
      console.error("Erro ao obter os dados dos produtos:", error);
    }
  };

  getProductsData();
  const { name, photos, address, rating = 4, placeId } = products[0];

  const ratingArray = Array.from(new Array(Math.floor(products.rating)));
  console.log("passou aqui");
  return (
    <ProductCard elevation={5}>
      <ProductCardCover key={name} source={{ products: photos[0] }} />
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
