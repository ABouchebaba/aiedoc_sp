import React from 'react';
import HomeDrawer from './HomeDrawer';
import AuthStack from './AuthStack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {setToken} from '../Store/api';

const Navigator = () => {
  const {user, token} = useSelector((state) => state.user);
  // recover token from storage and put it in Axios
  if (token) setToken('x-auth-token', token);
  return (
    <NavigationContainer theme={DefaultTheme}>
      {user ? <HomeDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigator;
