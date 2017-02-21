import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { BaseText } from '../../components/BaseText';
import { ActionDetailWithData } from './components/ActionDetail';

export default class ActionDetailScreen extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: '#22A699',
      tintColor: '#fff',
      title: (params) => {
        return `${params.action.actionName}`;
      },
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ActionDetailWithData action={this.props.route.params.action}/>
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
    paddingTop: 10,
    marginBottom: 20,
    marginHorizontal: 15
  },
});
