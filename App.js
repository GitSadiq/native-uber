import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Navigate from "./src/navigation";
export default function App() {
  return (
    <View style={styles.container}>
      <Navigate />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
  },
});
