import React, { FC, useState } from "react";
import {
  Button,
  Text,
  StyleSheet,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useThemeColor from "../hooks/useThemeColor";
import { TimerStackNavProps } from "../navigation/TimerStack";

export const TimerConfScreen: FC<TimerStackNavProps<"TimerConf">> = ({
  navigation,
}) => {
  const backgroundColor = useThemeColor("background");
  const inputBackground = useThemeColor("inputBackground");
  const textColor = useThemeColor("text");

  const [rounds, setRounds] = useState("");

  const startTimer = () => {
    navigation.navigate("Timer", { rounds: Number.parseInt(rounds) });
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <View style={styles.inputContainer}>
        <Text style={{ color: textColor }}>Add rounds</Text>
        <TextInput
          style={[styles.input, { backgroundColor: inputBackground }]}
          keyboardType="numeric"
          value={rounds}
          onChangeText={setRounds}
        ></TextInput>
      </View>
      <Button title="Start timer" onPress={startTimer} />
    </ScrollView>
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
