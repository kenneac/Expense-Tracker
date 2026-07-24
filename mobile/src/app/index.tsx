import SafeScreen from "@/components/SafeScreen";
import { styles } from "@/assets/styles/home.styles";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <SafeScreen>
      <View style={styles.container}>
        <Text>Edit src/app/index.tsx to edit this screen.</Text>
      </View>
    </SafeScreen>
  );
}

