import React, { FC } from "react";
import { Text } from "react-native";
import useThemeColor from "../hooks/useThemeColor";
import { TimerModel, TimerState } from "../hooks/useTimer";

type TimerDisplayProps = {
  timer: TimerModel;
};

export const TimerDisplay: FC<TimerDisplayProps> = ({ timer }) => {
  const textColor = useThemeColor("text");

  function formatTime(inputMs: number) {
    const ms = inputMs % 1000;
    inputMs = (inputMs - ms) / 1000;
    const secs = inputMs % 60;
    inputMs = (inputMs - secs) / 60;
    const mins = inputMs % 60;
    const hrs = (inputMs - mins) / 60;

    const pad = (number: number, digits: number = 2) => {
      return ("00" + number).slice(-digits);
    };

    return hrs
      ? `${hrs}h ${pad(mins)}m ${pad(secs)}.${ms / 100}s`
      : mins
      ? `${mins}m ${pad(secs)}.${ms / 100}s`
      : `${secs}.${ms / 100}s`;
  }

  return (
    <>
      <Text style={{ color: textColor }}>
        Round {timer.state.currentRound}/{timer.state.maxRounds}
      </Text>
      <Text style={{ color: textColor }}>
        {formatTime(timer.state.timeInMs)}
      </Text>
    </>
  );
};
