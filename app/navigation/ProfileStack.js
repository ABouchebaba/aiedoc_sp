import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Profile from "../screens/Profile";
import ChangePhoneNumber from "../screens/ChangePhoneNumber";

const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator  headerMode={false} initialRouteName={"Profile"}>
      <ProfileStack.Screen name="Profile" component={Profile} />
      <ProfileStack.Screen name="ChangePhoneNumber" component={ChangePhoneNumber} />
    </ProfileStack.Navigator>
  );
}

export default ProfileStackScreen;
