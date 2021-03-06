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
        issueName
        issueDescription
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
          style={{fontSize: 18, marginTop: 10,}}
        >
          Actions:
        </BaseText>

        {this._renderSeparator()}
      </View>
    )
  }

  _renderSeparator = () => (
    <View
      key={`-1--1`}
      style={{
        height: 1,
        backgroundColor: '#CCCCCC',
      }}
    />
  );

}

const styles = StyleSheet.create({
  container: {
    margin: 15
  }
})
