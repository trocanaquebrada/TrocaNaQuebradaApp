import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { Text, View } from "react-native";
import { Card } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
/*import available from "../../assets/available";*/
import { getFirestore, collection, getDocs } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-bottom: ${(props) => props.theme.space[3]};
`;

const ProductCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

const Title = styled(Text)`
  font-family: ${(props) => props.theme.fonts.heading};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.primary};
`;

const Address = styled(Text)`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

const Info = styled(View)`
  padding: ${(props) => props.theme.space[3]};
`;

const Rating = styled(View)`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

const Section = styled(View)`
  flex-direction: row;
  align-items: center;
`;

/*const SectionEnd = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

const Available = styled(SvgXml)`
  flex-direction: row;
`;*/
console.log("ProductInfoCard, fora");
export const ProductInfoCard = ({ product = {} }) => {
  const [products, setProducts] = useState([]);
  console.log(products);
  console.log("ProductInfoCard");
  useEffect(() => {
    const db = getFirestore();
    const productSearch = async () => {
      const productCollectionRef = collection(db, "Product");
      console.log(productCollectionRef);
      const productsCollection = await getDocs(productCollectionRef);
      /*       const photoUri = await AsyncStorage.getItem(`${docRef.uid}-photo`);
      setPhoto(photoUri); */
      const productsData = productsCollection.docs.map((doc) => {
        const { nameProduct, lat, lng, userRef, id, address } = doc.data();
        return {
          name: nameProduct || "",
          address: address || "",
          latitude: lat || "",
          longitude: lng || "",
          ref: userRef || "",
          id: doc.id || "",
        };
      });
      console.log(productsData);
      setProducts(productsData);
    };
    productSearch();
  }, []);

  const {
    name,
    /*icon,*/
    photos = [
      "https://cdn.shopify.com/s/files/1/0649/5223/8331/products/conjunto-fitness-legging-e-top-degrade-conjunto-de-academia-feminino-roupa-de-academia-utilidadesweb01-rosa-pink-p-152991_600x600_crop_center.jpg?v=1670868851",
    ],
    address,
    rating = 4,
    placeId,
    /*isAvailable = true,*/
  } = product;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <ProductCard elevation={5}>
      <ProductCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Title>{name}</Title>
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
