import React, { FC } from "react";
import { Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Timer } from "../components/Timer";
import useThemeColor from "../hooks/useThemeColor";
import { TimerStackNavProps } from "../navigation/TimerStack";

export const TimerScreen: FC<TimerStackNavProps<"Timer">> = ({
  navigation,
  route,
}) => {
  const navigateBack = () => navigation.goBack();
  const backgroundColor = useThemeColor("background");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Timer rounds={route.params.rounds} />
      <Button title="Back to configuration" onPress={navigateBack} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
