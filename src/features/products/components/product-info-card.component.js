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
console.log("product-info-card fora");

//console.log("searchProduct");
//searchProducts();
//console.log(searchProducts());

export const ProductInfoCard = ({ product = {} }) => {
  const [products, setProducts] = useState([]);
  console.log("productsInfoCard");
  useEffect(() => {
    (async () => {
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
          photos: [
            "https://cdn.shopify.com/s/files/1/0649/5223/8331/products/conjunto-fitness-legging-e-top-degrade-conjunto-de-academia-feminino-roupa-de",
          ],
        };
      });
      setProducts(
        productsData.map((data) => ({
          name: data.name,
          latitude: data.latitude,
          longitude: data.longitude,
          photos: data.photos,
        }))
      );
    })();
  }, []);
  console.log("antes do mock");
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
  console.log(products);
  console.log("products");
  const ratingArray = Array.from(new Array(Math.floor(rating)));
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
