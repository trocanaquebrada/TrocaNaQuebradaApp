import styled from "styled-components";
import { Card, Button } from "react-native-paper";
import { colors } from "../../../infrastructure/theme/colors";

export const Icon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const ProductCard = styled(Card)`
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

export const ProductCardCover = styled(Card.Cover)`
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.secondary};
`;

export const ProductButton = styled(Button).attrs({
  color: colors.bg.secondary,
})`
  padding: ${(props) => props.theme.space[1]};
`;

export const Address = styled.Text`
  font-family: ${(props) => props.theme.fonts.body};
  font-size: ${(props) => props.theme.fontSizes.caption};
`;

export const Info = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

export const Rating = styled.View`
  flex-direction: row;
  padding-top: ${(props) => props.theme.space[2]};
  padding-bottom: ${(props) => props.theme.space[2]};
`;

export const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;
