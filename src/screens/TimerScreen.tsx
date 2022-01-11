import React, { FC } from "react";
import { Button, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TimerStackNavProps } from "../navigation/TimerStack";

export const TimerScreen: FC<TimerStackNavProps<"Timer">> = ({
  navigation,
}) => {
  return (
    <SafeAreaView>
      <Text>Screen to run timer</Text>
      <Button
        title="Back to configuration"
        onPress={() => navigation.navigate("TimerConf")}
      />
    </SafeAreaView>
  );
};
