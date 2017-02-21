import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { graphql } from 'react-apollo';

import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';

import { BaseText } from '../../../components/BaseText';

export class Title extends React.Component {
  static fragments = {
    issue: gql` 
      fragment TitleIssue on Issue {
        id
        IssueName
        IssueDescription
      }
    `
  }

  render() {
    return (
      <View style={styles.container}>
        <BaseText
          fontFace="source-sans"
          style={{fontSize: 14}}
        >
          Description: {this.props.issue.issueDescription}
        </BaseText>
        
       <BaseText
          fontFace="source-sans"
          style={{fontSize: 18}}
        >
          Actions:
        </BaseText>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 15
  }
})
