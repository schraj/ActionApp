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

export class ActionListItem extends React.Component {
  static fragments = {
    action: gql`
      fragment ActionListItemAction on Action {
        id
        actionName
        actionDescription
        issue {
          id
          issueName
          issueDescription
        }
      }
    `
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.onPress(this.props.action)}
      >
        <View style={styles.text}>
          <BaseText
            fontFace="source-sans"
            style={{ fontSize: 14 }}
          >
            {this.props.action.actionName}
          </BaseText>
          <BaseText
            fontFace="source-sans"
            style={{ fontSize: 12 }}
          >
            {this.props.action.actionDescription}
          </BaseText>
        </View>
      </TouchableOpacity>
    )
  }
}

ActionListItem.propTypes = {
  action: propType(ActionListItem.fragments.action).isRequired,
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
