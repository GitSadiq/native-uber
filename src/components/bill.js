import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import distance from "./distanceCal";

export default function Bill() {
  const [Km, setKm] = useState();
  const rate = 20;
  const initail = 40;
  const total = (initail + Km * rate).toFixed(0);
  const reduxData = useSelector((state) => state);
  const pickUp = reduxData.locationSlice.pickUp?.coords;
  const Destination = reduxData.locationSlice?.Destination;

  useEffect(() => {
    const resp = distance(
      pickUp?.latitude,
      pickUp?.longitude,
      Destination?.lat,
      Destination?.lng
    );
    setKm(resp.toFixed(2));
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.billCard}>
        <Text style={styles.bill}>Trip Details</Text>
        <View style={styles.div}>
          <Text style={styles.text}>Confirm Ride: </Text>
          <Text style={styles.text}>{initail}</Text>
        </View>
        <View style={styles.div}>
          <Text style={styles.text}>Distance: </Text>
          <Text style={styles.text}>{Km}</Text>
        </View>
        <View style={styles.div}>
          <Text style={styles.text}>Per Km: </Text>
          <Text style={styles.text}>{rate}</Text>
        </View>

        <View style={[styles.div, styles.border]}>
          <Text style={[styles.text]}>Total:</Text>
          <Text style={styles.text}>RS: {total}</Text>
        </View>
        <Text style={styles.thanks}>Thanks for ride with us</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  billCard: {
    flex: 5 / 10,
    width: "80%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
    borderRadius: 10,
  },
  bill: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 28,
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 20,
  },
  text: {
    fontWeight: "600",
    fontSize: 20,
  },
  div: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  border: {
    borderTopWidth: 2,
  },
  thanks: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 28,
    textShadowColor: "black",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 20,
    paddingTop: 40,
  },
});
