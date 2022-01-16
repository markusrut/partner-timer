import React, { FC } from "react";
import { Text } from "react-native";
import useThemeColor from "../hooks/useThemeColor";

type TimeDisplayProps = {
  ms: number;
};

export const TimeDisplay: FC<TimeDisplayProps> = ({ ms }) => {
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

  return <Text style={{ color: textColor }}>{formatTime(ms)}</Text>;
};
