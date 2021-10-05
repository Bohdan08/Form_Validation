import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CreateUserScreen from "../screens/CreateUserScreen";
import HomeScreen from "../screens/HomeScreen";

const Stack = createStackNavigator();

export default function NavigationStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Create user" component={CreateUserScreen} />
    </Stack.Navigator>
  );
}
