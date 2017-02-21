import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { BaseText } from '../../components/BaseText';
import { TitleWithData } from './components/Title';

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: '#22A699',
      tintColor: '#fff',
      title: (route) => {
        return 'Action App';
      },
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <TitleWithData />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
});
