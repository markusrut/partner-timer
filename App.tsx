import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useColorScheme from "./src/hooks/useColorScheme";
import { Navigation } from "./src/navigation/_Navigation";

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
      <Navigation colorScheme={colorScheme} />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
