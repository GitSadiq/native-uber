import React from "react";
import { Text, StyleSheet, View, Pressable, Dimensions } from "react-native";
import MapView, { Marker, Polygon } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";

export default function Routes({ navigation }) {
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state);
  const pickUp = reduxData.locationSlice.pickUp?.coords;
  const Destination = reduxData.locationSlice?.Destination;
  const { width, height } = Dimensions.get("window");
  const aspect_ratio = width / height;
  const latitudeDelta = 0.2;
  const coordinates = [
    {
      latitude: Destination?.lat,
      longitude: Destination?.lng,
    },
    {
      latitude: pickUp?.latitude,
      longitude: pickUp?.longitude,
    },
  ];

  return (
    <View style={styles.containerMap}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: (Destination?.lat + pickUp?.latitude) / 2,
          longitude: (Destination?.lng + pickUp?.longitude) / 2,
          latitudeDelta: latitudeDelta,
          longitudeDelta: latitudeDelta * aspect_ratio,
        }}
      >
        <Polygon
          coordinates={coordinates}
          strokeColor="red"
          fillColor="black"
          strokeWidth={2}
        ></Polygon>
      </MapView>
      <View style={styles.btnContainer}>
        <Pressable
          style={styles.btn}
          onPress={() => {
            navigation.navigate("Bill");
          }}
        >
          <Text style={styles.btnText}>Ride Complete</Text>
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
