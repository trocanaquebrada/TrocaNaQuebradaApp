import React from "react";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components";
import { theme } from "./src/infrastructure/theme";
import { ProductsContextProvider } from "./src/resources/products/products.context";
import { LocationContextProvider } from "./src/resources/location/location.context";
import { Navigation } from "./src/infrastructure/navigation";
import { initializeApp } from "firebase/app";
import { AuthenticationContextProvider } from "./src/resources/authentication/authentication.context";

import {
  useFonts as useOswald,
  Oswald_400Regular,
} from "@expo-google-fonts/oswald";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

const firebaseConfig = {
  apiKey: "AIzaSyAEjVsERT9soo-WjVJRWKn0EYGSjzz07_o",
  authDomain: "trocanaquebrada-f3b2b.firebaseapp.com",
  projectId: "trocanaquebrada-f3b2b",
  storageBucket: "trocanaquebrada-f3b2b.appspot.com",
  messagingSenderId: "311100487456",
  appId: "1:311100487456:web:99b1e599dd4649f6848945",
};

export const firebaseApp = initializeApp(firebaseConfig);

if (!firebaseApp.length) {
  initializeApp(firebaseConfig);
}

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthenticationContextProvider>
          <LocationContextProvider>
            <ProductsContextProvider>
              <Navigation />
            </ProductsContextProvider>
          </LocationContextProvider>
        </AuthenticationContextProvider>
      </ThemeProvider>
      <ExpoStatusBar style="auto" />
    </>
  );
}
