import React, { useState, useContext } from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { AuthenticationContext } from "../../../resources/authentication/authentication.context";
import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  AuthInput,
  Title,
} from "../components/account.styles";

export const RegisterScreen = ({ navigation }) => {
  const [displayName, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cityAndState, setCityAndState] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const { onRegister, isLoading, error } = useContext(AuthenticationContext);

  return (
    <AccountBackground>
      <Title>Troca na Quebrada</Title>
      <AccountContainer>
        <AuthInput
          label="Nome"
          value={displayName}
          textContentType="name"
          keyboardType="default"
          autoCapitalize="words"
          onChangeText={(n) => setName(n)}
        />
        <Spacer size="medium">
          <AuthInput
            label="CPF"
            value={cpf}
            textContentType="none"
            keyboardType="number-pad"
            autoCapitalize="none"
            onChangeText={(c) => setCpf(c)}
          />
        </Spacer>
        <Spacer size="medium">
          <AuthInput
            label="Endereco"
            value={address}
            textContentType="fullStreetAddress"
            keyboardType="default"
            autoCapitalize="words"
            onChangeText={(ad) => setAddress(ad)}
          />
        </Spacer>
        <Spacer size="medium">
          <AuthInput
            label="CEP"
            value={postalCode}
            textContentType="postalCode"
            keyboardType="number-pad"
            autoCapitalize="none"
            onChangeText={(pc) => setPostalCode(pc)}
          />
        </Spacer>
        <Spacer size="medium">
          <AuthInput
            label="Cidade/Estado"
            value={cityAndState}
            textContentType="addressCityAndState"
            keyboardType="default"
            autoCapitalize="words"
            onChangeText={(cs) => setCityAndState(cs)}
          />
        </Spacer>
        <Spacer size="medium">
          <AuthInput
            label="E-mail"
            value={email}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(u) => setEmail(u)}
          />
        </Spacer>
        <Spacer size="medium">
          <AuthInput
            label="Senha"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
          />
        </Spacer>
        <Spacer size="medium">
          <AuthInput
            label="Repetir Senha"
            value={repeatedPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(rp) => setRepeatedPassword(rp)}
          />
        </Spacer>
        {error && (
          <Spacer size="large">
            <Text variant="error">{error}</Text>
          </Spacer>
        )}
        <Spacer size="medium">
          {!isLoading ? (
            <AuthButton
              icon="email"
              mode="contained"
              onPress={() =>
                onRegister(
                  displayName,
                  cpf,
                  address,
                  postalCode,
                  cityAndState,
                  email,
                  password,
                  repeatedPassword
                )
              }
            >
              Cadastrar
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={MD2Colors.blue300} />
          )}
        </Spacer>
      </AccountContainer>
      <Spacer size="medium">
        <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Voltar
        </AuthButton>
      </Spacer>
    </AccountBackground>
  );
};
