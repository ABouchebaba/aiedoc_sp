import React from 'react';
import {store, persistor} from './app/Store';
import {Provider} from 'react-redux';
import Navigator from './app/navigation';
// import {AppLoading} from 'expo';
import {PersistGate} from 'redux-persist/integration/react';
import * as firebase from 'firebase/app';
import {enableScreens} from 'react-native-screens';
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

  static getDerivedStateFromError(error) {
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    console.log('error', error);
    // console.log(error);
  }

  componentDidMount() {
    firebase.initializeApp(firebaseConfig);
  }

  async load() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

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
