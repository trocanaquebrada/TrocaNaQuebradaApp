import { TextInput } from "react-native-paper";
import styled from "styled-components";
import { Text } from "../../../components/typography/text.component";

export const ProfileBackground = styled.ImageBackground.attrs({
  source: require("../../../../assets/background1.png"),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ProfileContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
`;

export const Title = styled(Text)`
  font-size: 30px;
`;

export const ProfileInput = styled(TextInput)`
  width: 300px;
`;
