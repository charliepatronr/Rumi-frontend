import React from 'react';
import configureStore from './configureStore';
import {Provider} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import Navigation from './src/navigations/Navigation';

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Provider store={configureStore}>
        <Navigation />
      </Provider>
    );
  }
}

export default App;
