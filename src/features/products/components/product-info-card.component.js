import React from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";

import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
/*import available from "../../assets/available";*/
import { getFirestore, collection, getDocs } from "firebase/firestore";
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
