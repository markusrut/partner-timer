import React, { FC } from "react";
import { Button, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useThemeColor from "../hooks/useThemeColor";
import { TimerStackNavProps } from "../navigation/TimerStack";

export const TimerConfScreen: FC<TimerStackNavProps<"TimerConf">> = ({
  navigation,
}) => {
  const backgroundColor = useThemeColor("background");
  const textColor = useThemeColor("text");

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Text style={{ color: textColor }}>Screen to configure the timer</Text>
      <Button
        title="Start timer"
        onPress={() => navigation.navigate("Timer")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
