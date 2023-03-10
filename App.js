import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Navigate from "./src/navigation";
import { Provider } from "react-redux";
import { store } from "./src/store/store";
export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Navigate />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 50,
  },
});
