import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import IntCheck from '../screens/IntCheck';
import IntFinish from '../screens/IntFinish';
import IntValidate from '../screens/IntValidate';
import IntReview from '../screens/IntReview';
import Home from '../screens/Home';
import {useSelector, useDispatch} from 'react-redux';
const InterventionStack = createStackNavigator();

function InterventionStackScreen() {
  const dispatch = useDispatch();
  const intervention = useSelector((state) => state.current.intervention);

  let name = 'Home';
  let screen = Home;
  // console.log('state : ' + intervention.state);
  switch (intervention.state) {
    case 'pending': {
      name = 'Check';
      screen = IntCheck;
      break;
    }
    case 'refused': {
      name = 'Home';
      screen = Home;
      break;
    }
    case 'accepted': {
      name = 'Finish';
      screen = IntFinish;
      break;
    }
    case 'finished': {
      name = 'Validate';
      screen = IntValidate;
      break;
    }
    case 'validated': {
      name = 'Review';
      screen = IntReview;
      break;
    }
  }

  return (
    <InterventionStack.Navigator headerMode={false}>
      <InterventionStack.Screen name={name} component={screen} />
    </InterventionStack.Navigator>
  );
}

export default InterventionStackScreen;
