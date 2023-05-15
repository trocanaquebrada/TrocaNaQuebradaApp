import React, { useState, useContext } from "react";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { SafeArea } from "../../../components/utility/safe-area.component";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const { onRegister, isLoading, error } = useContext(AuthenticationContext);

  return (
    <AccountBackground>
      <SafeArea>
        <Spacer size="extralarge" position="top">
          <Title>Troca na Quebrada</Title>
        </Spacer>
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
              label="Endereco Completo"
              value={address}
              textContentType="fullStreetAddress"
              keyboardType="default"
              autoCapitalize="words"
              onChangeText={(ad) => setAddress(ad)}
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
      </SafeArea>
    </AccountBackground>
  );
};
