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
    action: gql` 
      fragment TitleAction on Action {
        id
        actionName
        actionDescription
        officials {
          id
        }
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
          Description: {this.props.action.actionDescription}
        </BaseText>
        
       <BaseText
          fontFace="source-sans"
          style={{fontSize: 18, marginTop: 10,}}
        >
          Officials:
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
