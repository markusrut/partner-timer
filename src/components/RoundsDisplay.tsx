import React, { FC } from "react";
import { Text } from "react-native";
import useThemeColor from "../hooks/useThemeColor";

type RoundsDisplayProps = {
  current: number;
  max: number;
};

export const RoundsDisplay: FC<RoundsDisplayProps> = ({ current, max }) => {
  const textColor = useThemeColor("text");

  return (
    <Text style={{ color: textColor }}>
      max Round {current}/{max}
    </Text>
  );
};
