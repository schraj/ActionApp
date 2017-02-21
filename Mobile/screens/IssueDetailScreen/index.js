import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { BaseText } from '../../components/BaseText';
import { IssueDetailWithData } from './components/IssueDetail';

export default class IssueDetailScreen extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: '#22A699',
      tintColor: '#fff',
      title: (params) => {
        return `${params.issue.issueName}`;
      },
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <IssueDetailWithData issue={this.props.route.params.issue}/>
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
