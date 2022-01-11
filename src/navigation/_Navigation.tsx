import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import React, { FC } from "react";
import { ColorSchemeName } from "react-native";
import { TimerStack } from "./TimerStack";

type NavigationProps = { colorScheme: ColorSchemeName };

export const Navigation: FC<NavigationProps> = ({ colorScheme }) => {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <TimerStack />
    </NavigationContainer>
  );
};
