import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Destination from "../components/destination";
import Pickup from "../components/pickup";
import Routes from "../components/routes";
import Bill from "../components/bill";

export default function Navigate() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Pickup"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;

          if (routeName === "Pickup") {
            iconName = focused ? "ios-location" : "ios-location-outline";
          } else if (routeName === "Destination") {
            iconName = focused ? "my-location" : "location-searching";
          } else if (routeName === "Routes") {
            iconName = focused ? "sitemap" : "sitemap-outline";
          } else if (routeName === "Bill") {
            iconName = focused ? "account-key" : "account-key-outline";
          }

          {
            if (
              iconName === "ios-location" ||
              iconName === "ios-location-outline"
            )
              return <Ionicons name={iconName} size={size} color={color} />;
            else if (
              iconName === "my-location" ||
              iconName === "location-searching"
            ) {
              return (
                <MaterialIcons name={iconName} size={size} color={color} />
              );
            } else {
              return (
                <MaterialCommunityIcons
                  name={iconName}
                  size={size}
                  color={color}
                />
              );
            }
          }
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "grey",
        tabBarStyle: { height: 60, paddingTop: 5 },
        tabBarLabelStyle: { padding: 5, fontSize: 15, paddingTop: 2 },
      })}
    >
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Pickup"
        component={Pickup}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Destination"
        component={Destination}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Routes"
        component={Routes}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Bill"
        component={Bill}
      />
    </Tab.Navigator>
  );
}
