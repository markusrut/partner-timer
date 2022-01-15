import React, { FC, useReducer } from "react";
import { Button, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useThemeColor from "../hooks/useThemeColor";
import { TimerStackNavProps } from "../navigation/TimerStack";

type TimerState = {
  maxRounds: number;
  currentRound: number;
  timeInMs: number;
  countUp: boolean;
  ticker: NodeJS.Timer | null;
  roundTimes: number[];
  done: boolean;
};
type TimerAction = {
  type: "count" | "reset" | "time-round" | "set-ticker" | "remove-ticker";
  ticker?: NodeJS.Timer | null;
};

export const TimerScreen: FC<TimerStackNavProps<"Timer">> = ({
  navigation,
  route,
}) => {
  const backgroundColor = useThemeColor("background");
  const textColor = useThemeColor("text");

  const timerIncrement = 1000;

  const initialState: TimerState = {
    timeInMs: 0,
    currentRound: 1,
    maxRounds: route.params.rounds,
    countUp: true,
    ticker: null,
    roundTimes: [],
    done: false,
  };

  function timerReducer(state: TimerState, action: TimerAction): TimerState {
    switch (action.type) {
      case "count":
        const timerZero = state.timeInMs === 0;
        const newRound = !state.countUp && timerZero;

        const currentRound = newRound
          ? state.currentRound + 1
          : state.currentRound;

        if (currentRound > state.maxRounds && state.ticker) {
          console.log("Stop ticker", state.roundTimes);

          clearInterval(state.ticker);
          return { ...state, ticker: null, done: true };
        }

        const countUp = state.countUp || newRound;

        const timeInMs = countUp
          ? state.timeInMs + timerIncrement
          : state.timeInMs - timerIncrement;

        return {
          ...state,
          timeInMs,
          countUp,
          currentRound,
        };
      case "time-round":
        return {
          ...state,
          countUp: false,
          roundTimes: [...state.roundTimes, state.timeInMs],
        };
      case "set-ticker":
        if (!action.ticker)
          throw new Error("Missing arg action.ticker when setting ticker");
        return { ...state, ticker: action.ticker };
      case "remove-ticker":
        if (state.ticker) clearInterval(state.ticker);
        return { ...state, ticker: null };
      case "reset":
        return { ...initialState };
      default:
        throw new Error("Not implemented timer action");
    }
  }

  const [timer, dispatchTimer] = useReducer(timerReducer, initialState);

  const startTicker = () => {
    if (timer.ticker) return;

    const ticker = setInterval(() => {
      dispatchTimer({ type: "count" });
    }, timerIncrement);
    dispatchTimer({ type: "set-ticker", ticker });
  };

  const stopTicker = () => dispatchTimer({ type: "remove-ticker" });
  const resetTimer = () => dispatchTimer({ type: "reset" });
  const countDown = () => dispatchTimer({ type: "time-round" });
  const navigateBack = () => navigation.goBack();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Text style={{ color: textColor }}>
        Round {timer.currentRound}/{timer.maxRounds}
      </Text>
      <Text style={{ color: textColor }}>{timer.timeInMs / 1000}</Text>
      {timer.ticker ? (
        <Button title="Pause" onPress={stopTicker} />
      ) : (
        <Button title="Play" onPress={startTicker} />
      )}
      {!timer.ticker && <Button title="Reset" onPress={resetTimer} />}
      {timer.countUp && timer.ticker && (
        <Button title="Count down" onPress={countDown} />
      )}

      {timer.done && <Text>{timer.roundTimes}</Text>}

      <Button title="Back to configuration" onPress={navigateBack} />
    </SafeAreaView>
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
