import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { FC } from "react";
import { TimerConfScreen } from "../screens/TimerConfScreen";
import { TimerScreen } from "../screens/TimerScreen";

type TimerStackProps = {};

export type TimerStackParamList = {
  TimerConf: undefined;
  Timer: undefined;
};

export type TimerStackNavProps<Screen extends keyof TimerStackParamList> =
  NativeStackScreenProps<TimerStackParamList, Screen>;

const Timer = createNativeStackNavigator<TimerStackParamList>();

export const TimerStack: FC<TimerStackProps> = ({}) => {
  return (
    <Timer.Navigator initialRouteName="TimerConf">
      <Timer.Screen
        name="TimerConf"
        component={TimerConfScreen}
        options={{ headerShown: false }}
      />
      <Timer.Screen
        name="Timer"
        component={TimerScreen}
        options={{ headerShown: false }}
      />
    </Timer.Navigator>
  );
};
