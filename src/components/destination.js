import React, { useRef } from "react";
import {
  Text,
  StyleSheet,
  View,
  Pressable,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import { DestinationLocation } from "../store/slice/locationSlice";

export default function Destination({ navigation }) {
  const [Current, setCurrent] = useState(null);
  const [search, setSearch] = useState(false);
  const [results, setResults] = useState([]);
  const [LatLng, setLatLng] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  const { width, height } = Dimensions.get("window");
  const aspect_ratio = width / height;
  const latitudeDelta = 0.009;
  const mapRef = useRef();

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
        (location) => setCurrent(location)
      );
    })();
  }, [LatLng]);

  function searchLocation() {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=APIkey`
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonData) => {
        // console.log(jsonData.results);
        setResults(jsonData.results);
      })
      .catch((error) => {
        // console.log(error);
      });
  }

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateCamera({
        center: {
          latitude: LatLng.lat,
          longitude: LatLng.lng,
        },
        duration: 500,
      });
    }
  }, [LatLng]);

  if (!Current) {
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
          onChangeText={(text) => {
            setSearch(text);
          }}
        >
          {search}
        </TextInput>
        <Pressable style={styles.inputIcon} onPress={() => searchLocation()}>
          <FontAwesome5 name="search-location" size={24} color="white" />
        </Pressable>
      </View>
      <View style={results ? styles.searchItem : styles.searchItemNone}>
        {results?.map((item, index) => {
          return (
            <Pressable
              key={index}
              onPress={() => {
                setLatLng(item.geometry.location);
                setSearch(item.formatted_address);
                setResults([]);
              }}
            >
              <Text style={styles.SearchText}>{item.formatted_address}</Text>
            </Pressable>
          );
        })}
      </View>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: LatLng ? LatLng.lat : Current.coords.latitude,
          longitude: LatLng ? LatLng.lng : Current.coords.longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: latitudeDelta * aspect_ratio,
        }}
      >
        <Marker
          title={"my location"}
          description={"This is mycurrent location"}
          coordinate={{
            latitude: LatLng ? LatLng.lat : Current.coords.latitude,
            longitude: LatLng ? LatLng.lng : Current.coords.longitude,
          }}
        />
      </MapView>

      <View style={styles.btnContainer}>
        <Pressable
          style={styles.btn}
          onPress={() => {
            dispatch(DestinationLocation(LatLng));
            navigation.navigate("Routes");
          }}
        >
          <Text style={styles.btnText}>Confirm Destination</Text>
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
    width: "78%",
    zIndex: 1,
    position: "absolute",
    top: 20,
    left: 14,
    flex: 1,
    flexDirection: "row",
  },
  inputIcon: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "black",
    marginLeft: 10,
  },
  Search: {
    padding: 5,
    width: "100%",
    fontSize: 22,
    paddingStart: 20,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "black",
    paddingLeft: 20,
  },
  searchItem: {
    borderRadius: 5,
    backgroundColor: "black",
    width: "94%",
    zIndex: 1,
    position: "absolute",
    top: 80,
    left: 14,
    flexDirection: "column",
  },
  searchItemNone: {
    display: "none",
  },
  SearchText: {
    fontSize: 20,
    color: "white",
    padding: 10,
    borderBottomWidth: 2,
    borderColor: "grey",
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
