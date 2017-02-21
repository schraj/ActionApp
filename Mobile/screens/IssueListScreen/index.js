import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Router from '../../navigation/Router';

import { BaseText } from '../../components/BaseText';
import { IssueListWithData} from './components/IssueList';

export default class IssueListScreen extends React.Component {
  static route = {
    navigationBar: {
      backgroundColor: '#22A699',
      tintColor: '#fff',
      title: (route) => {
        return 'Action App';
      },
    }
  }

  _goToDetail = (issue) => {
    this.props.navigation
      .getNavigator('root')
      .push(Router.getRoute('issueDetail', { issue }));
  }

  render() {
    return (
      <View style={styles.container}>
        <IssueListWithData onRowPress={this._goToDetail}/>
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
