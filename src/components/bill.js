import React from "react";
import { Text, StyleSheet, View } from "react-native";

export default function Bill() {
  return (
    <View style={styles.container}>
      <Text>Bill</Text>
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
