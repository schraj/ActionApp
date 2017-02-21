import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { BaseText } from '../../components/BaseText';
import { SettingsFormWithMutation  } from './components/SettingsForm';
import Router from '../../navigation/Router';

export default class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: '#22A699',
      tintColor: '#fff',
      title: (route) => {
        return 'Settings';
      },
    }
  }

  _resetStack = (issue) => {
    this.props.navigation.performAction(({ tabs, stacks }) => {
      tabs('main').jumpToTab('issues')
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <SettingsFormWithMutation 
          onSave={this._resetStack}

        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    marginBottom: 20,
    marginHorizontal: 15,
  },

});
