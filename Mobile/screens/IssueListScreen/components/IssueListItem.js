import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';

import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';

import { BaseText } from '../../../components/BaseText';

export class IssueListItem extends React.Component {
  static fragments = {
    issue: gql`
      fragment IssueListItemIssue on Issue {
        id
        issueName
        issueDescription
      }
    `
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.onPress(this.props.issue)}
      >
        <View style={styles.text}>
          <BaseText
            fontFace="source-sans"
            style={{ fontSize: 14 }}
          >
            {this.props.issue.issueName}
          </BaseText>
          <BaseText
            fontFace="source-sans"
            style={{ fontSize: 12 }}
          >
            {this.props.issue.issueDescription}
          </BaseText>
        </View>
      </TouchableOpacity>
    )
  }
}

IssueListItem.propTypes = {
  issue: propType(IssueListItem.fragments.issue).isRequired,
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    paddingVertical: 5,
    alignSelf: 'stretch',
  },
  text: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  image: {
    width: 50,
    height: 50
  }
});
