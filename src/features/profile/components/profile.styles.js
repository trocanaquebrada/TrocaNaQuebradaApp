import { TextInput, Button } from "react-native-paper";
import styled from "styled-components";
import { Text } from "../../../components/typography/text.component";
import { colors } from "../../../infrastructure/theme/colors";

export const ProfileBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/background1.png"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ProfileContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[3]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const ProfileButton = styled(Button).attrs({
  color: colors.brand.primary,
})`
  padding: ${(props) => props.theme.space[2]};
`;

export const Title = styled(Text)`
  font-size: 40px;
`;

export const ProfileInput = styled(TextInput)`
  width: 300px;
`;
