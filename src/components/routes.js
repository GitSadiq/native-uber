import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function Routes() {
  return (
    <View style={styles.container}>
      <Text>Routes</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
