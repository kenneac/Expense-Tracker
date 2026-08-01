import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";

const SafeScreen = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      {children}
    </SafeAreaView>
  );
};

export default SafeScreen;
