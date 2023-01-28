import React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

export default function Pickup({ navigation }) {
  const [pickUp, setpickUp] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setpickUp(location);
    })();
  }, []);

  if (!pickUp) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.containerMap}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: pickUp.coords.latitude,
          longitude: pickUp.coords.longitude,
          latitudeDelta: 0.0009,
          longitudeDelta: 0.0009,
        }}
      >
        <Marker
          title={"my pickUp"}
          description={"This is mycurrent pickUp"}
          coordinate={{
            latitude: pickUp.coords.latitude,
            longitude: pickUp.coords.longitude,
          }}
        />
      </MapView>
      <View style={styles.btnContainer}>
        <Pressable
          style={styles.btn}
          onPress={() => {
            navigation.navigate("Destination");
          }}
        >
          <Text style={styles.btnText}>Pick Destination</Text>
        </Pressable>
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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 20,
  },
  containerMap: {
    flex: 1,
    alignItems: "center",
  },
  map: {
    flex: 9 / 10,
    width: "100%",
    height: "100%",
    marginTop: -29,
  },
  btnContainer: {
    flex: 1 / 10,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "black",
    paddingLeft: 40,
    paddingRight: 40,
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
});
