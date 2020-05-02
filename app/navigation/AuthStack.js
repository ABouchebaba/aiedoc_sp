import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AuthPhone from '../screens/AuthPhone';
import AuthPin from '../screens/AuthPin';
import AuthForm from '../screens/AuthForm';
import AuthProForm from '../screens/AuthProForm';
import AuthServiceForm from '../screens/AuthServiceForm';

const AuthStack = createStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator headerMode={false} initialRouteName={'AuthPhone'}>
      <AuthStack.Screen name="AuthPhone" component={AuthPhone} />
      {/* <AuthStack.Screen name="AuthPin" component={AuthPin} />
      <AuthStack.Screen name="AuthForm" component={AuthForm} />
      <AuthStack.Screen name="AuthProForm" component={AuthProForm} />
      <AuthStack.Screen name="AuthServiceForm" component={AuthServiceForm} /> */}
    </AuthStack.Navigator>
  );
}

export default AuthStackScreen;
