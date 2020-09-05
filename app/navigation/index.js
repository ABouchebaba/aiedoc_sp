import React from 'react';
import HomeDrawer from './HomeDrawer';
import AuthStack from './AuthStack';
import InterventionStack from './InterventionStack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {setToken} from '../Store/api';

const Navigator = () => {
  const {user, token} = useSelector((state) => state.user);
  const {intervention} = useSelector((state) => state.current);
  // take token from storage and put it in Axios
  if (token) setToken('x-auth-token', token);

  // console.log(intervention._id);
  return (
    <NavigationContainer theme={DefaultTheme}>
      {intervention ? (
        <InterventionStack />
      ) : user ? (
        <HomeDrawer />
      ) : (
        <AuthStack />
      )}
      {/* {user ? <HomeDrawer /> : <AuthStack />} */}
    </NavigationContainer>
  );
};

export default Navigator;
