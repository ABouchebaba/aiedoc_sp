import React from 'react';
import {store, persistor} from './app/Store';
import {Provider} from 'react-redux';
import Navigator from './app/navigation';
// import {AppLoading} from 'expo';
import SplashScreen from 'react-native-splash-screen';
import {PersistGate} from 'redux-persist/integration/react';
import * as firebase from 'firebase/app';
import {enableScreens} from 'react-native-screens';
import OneSignal from 'react-native-onesignal';
import {setCurrent} from './app/Store/actions/current';

enableScreens(); // for performance optimization

// to be put in env or some config file
const firebaseConfig = {
  apiKey: 'AIzaSyBXHF2T1dwF260MC73UGCp1bnA0VRnrSbg',
  authDomain: 'aiedoc-test-sp.firebaseapp.com',
  databaseURL: 'https://aiedoc-test-sp.firebaseio.com',
  projectId: 'aiedoc-test-sp',
  storageBucket: 'aiedoc-test-sp.appspot.com',
  messagingSenderId: '631322958940',
  appId: '1:631322958940:web:270280599bf775de079a99',
};

class App extends React.Component {
  state = {
    isReady: false,
    hasError: false,
  };

  onReceived(notification) {
    // console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    // console.log('Message: ', openResult.notification.payload.body);
    // console.log('Data: ', openResult.notification.payload.additionalData);
    // console.log('isActive: ', openResult.notification.isAppInFocus);
    // console.log('openResult: ', openResult);

    // console.log('problem', openResult.notification.payload);
    // Get data from notification
    const data = openResult.notification.payload.additionalData;

    // data has intervention key then it is an intervention notification
    if (data.intervention) {
      // console.log('opening');
      // console.log(data);
      const {intervention, client, distance} = data;
      client.distance = distance;
      if (!intervention.services) {
        intervention.services = [];
      }
      // set state current intervention
      store.dispatch(setCurrent(intervention, client));
    }
  }

  constructor(props) {
    super(props);
    OneSignal.setLogLevel(6, 0);
    // AsyncStorage.clear();
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.log('error', error);
    // console.log(error);
  }

  onIds = () => {
    // console.log('starting');
  };

  componentDidMount() {
    // OneSignal.addEventListener('ids', this.onIds);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
    // console.log('added events');

    OneSignal.init('aac6ed8b-9b71-4cd7-95c4-dc0931101a87', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    SplashScreen.hide();
  }

  async load() {
    // Initialize Firebase
    // firebase.initializeApp(firebaseConfig);

    return;
  }

  render = () => {
    // if (!this.state.isReady) {
    //   return (
    //     <AppLoading
    //       startAsync={this.load}
    //       onFinish={() => this.setState({isReady: true})}
    //       onError={console.warn}
    //     />
    //   );
    // }
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  };
}

export default App;
