import Colors from "../styling/Colors";
import useColorScheme from "./useColorScheme";

type ColorKeys = keyof typeof Colors.light & keyof typeof Colors.dark;

export default function useThemeColor(colorName: ColorKeys) {
  const theme = useColorScheme();

  return Colors[theme][colorName];
}
