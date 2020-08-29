import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {CustomDrawerContent} from '../components';
import About from '../screens/About';
import History from '../screens/History';
// import AuthTermsAndConditions from '../screens/AuthTermsAndConditions';
import Home from '../screens/Home';
import ProfileStack from './ProfileStack';
import Commands from '../screens/Commands';
import StoreStack from './StoreStack';

const HomeDrawer = createDrawerNavigator();
// android:launchMode="singleTask"

function HomeDrawerScreen() {
  return (
    <HomeDrawer.Navigator
      drawerType="slide"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName={'Accueil'}
      // drawerStyle={{height:"100%"}}
    >
      <HomeDrawer.Screen name="Accueil" component={Home} />
      <HomeDrawer.Screen name="Boutique" component={StoreStack} />
      <HomeDrawer.Screen name="Mes prestations" component={History} />
      <HomeDrawer.Screen name="Mes achats" component={Commands} />
      <HomeDrawer.Screen name="Profil" component={ProfileStack} />
      {/* <HomeDrawer.Screen
        name="AuthTermsAndConditions"
        component={AuthTermsAndConditions}
      /> */}
      <HomeDrawer.Screen name="A propos" component={About} />
    </HomeDrawer.Navigator>
  );
}

export default HomeDrawerScreen;
