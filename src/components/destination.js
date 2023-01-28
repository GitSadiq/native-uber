import React from "react";
import { Text, StyleSheet, View, Pressable, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { SearchBar } from "react-native-screens";

export default function Destination({ navigation }) {
  const [Destination, setDestination] = useState(null);
  const [search, setSearch] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 1000,
          distanceInterval: 0.5,
        },
        (location) => setDestination(location)
      );
    })();
  }, []);

  if (!Destination) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>loading...</Text>
      </View>
    );
  }
  return (
    <View style={styles.containerMap}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.Search}
          placeholder="Search Location"
          onChangeText={(text) => setSearch(text)}
        >
          {search}
        </TextInput>
        <Text style={search ? styles.SearchText : styles.SearchTextNone}>
          {search}
        </Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: Destination.coords.latitude,
          longitude: Destination.coords.longitude,
          latitudeDelta: 0.0009,
          longitudeDelta: 0.0009,
        }}
      >
        <Marker
          title={"my location"}
          description={"This is mycurrent location"}
          coordinate={{
            latitude: Destination.coords.latitude,
            longitude: Destination.coords.longitude,
          }}
        />
      </MapView>
      <View style={styles.btnContainer}>
        <Pressable
          style={styles.btn}
          onPress={() => {
            navigation.navigate("Routes");
          }}
        >
          <Text style={styles.btnText}>Start Ride</Text>
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
  inputContainer: {
    backgroundColor: "white",
    width: "90%",
    zIndex: 1,
    position: "absolute",
    top: 20,
  },
  SearchTextNone: {
    display: "none",
  },
  Search: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 5,
    width: "100%",
    fontSize: 20,
    paddingStart: 20,
  },
  SearchText: {
    fontSize: 20,
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
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
