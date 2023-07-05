import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import {Home} from './src/screens/Home';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={styles.backgroundStyle.backgroundColor}
      />
      <Home />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#000',
  },
});

export default App;
