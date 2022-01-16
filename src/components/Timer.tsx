import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import useTimer from "../hooks/useTimer";
import { TimerControls } from "./TimerControls";
import { TimerDisplay as TimerDisplay } from "./TimerDisplay";

type TimerProps = {
  rounds: number;
};

export const Timer: FC<TimerProps> = ({ rounds }) => {
  const timer = useTimer(rounds, 100);

  return (
    <View style={styles.container}>
      <TimerDisplay timer={timer} />
      <TimerControls timer={timer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
