import React, { FC } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import useTimer from "../hooks/useTimer";
import { TimeDisplay } from "./TimeDisplay";

type TimerProps = {
  rounds: number;
};

export const Timer: FC<TimerProps> = ({ rounds }) => {
  const timer = useTimer(rounds, 100);

  return (
    <View style={styles.container}>
      <TimeDisplay ms={timer.state.timeInMs} />
      {timer.state.ticker ? (
        <Button title="Pause" onPress={timer.stop} />
      ) : (
        <Button title="Play" onPress={timer.start} />
      )}
      {!timer.state.ticker && <Button title="Reset" onPress={timer.reset} />}
      {timer.state.countUp && timer.state.ticker && (
        <Button title="Count down" onPress={timer.countDown} />
      )}

      {timer.state.done && <Text>{timer.state.roundTimes}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    alignItems: "center",
  },
  input: {
    height: 80,
    width: 120,
    fontSize: 48,
    textAlign: "center",
    borderRadius: 8,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
