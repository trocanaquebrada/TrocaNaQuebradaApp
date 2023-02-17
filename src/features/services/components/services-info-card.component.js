import React from "react";
import styled from "styled-components";
import { Text, View } from "react-native";
import { Card } from "react-native-paper";
import { SvgXml } from "react-native-svg";
import star from "../../../../assets/star";
/*import available from "../../assets/available";*/

const ServiceCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
  margin-bottom: ${(props) => props.theme.space[3]};
`;

const ServiceCardCover = styled(Card.Cover)`
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

export const ServiceInfoCard = ({ service = {} }) => {
  const {
    name = "Cabeleireira",
    /*icon,*/
    photos = [
      "https://static1.segredosdesalao.com.br/articles/1/24/95/1/@/296442-veja-8-especialidades-que-um-cabeleireir-article_media_item-3.jpg",
    ],
    address = "1km de distancia",
    rating = 4,
    /*isAvailable = true,*/
  } = service;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <ServiceCard elevation={5}>
      <ServiceCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Title>{name}</Title>
        <Section>
          <Rating>
            {ratingArray.map(() => (
              <SvgXml xml={star} width={20} height={20} />
            ))}
          </Rating>
          {/*<SectionEnd>
            {isAvailable && <Available xml={available} width={20} height={20} />}
            </SectionEnd>*/}
        </Section>
        <Address>{address}</Address>
      </Info>
    </ServiceCard>
  );
};
