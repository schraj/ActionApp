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

export class OfficialListItem extends React.Component {
  static fragments = {
    official: gql`
      fragment OfficialListItemOfficial on Official {
        id
        lastName
        firstName
        governmentLevelId
        geographyId
        party
        gender
        email
        phone
        url
        contactForm
        twitter
        facebook
      }
    `
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => this.props.onPress(this.props.official)}
      >
        <View style={styles.text}>
          <BaseText
            fontFace="source-sans"
            style={{ fontSize: 12 }}
          >
            {this.props.official.firstName} {this.props.official.lastName}({this.props.official.party}) - {this.props.official.geographyId} {this.props.official.phone}
          </BaseText>
          <BaseText
            fontFace="source-sans"
            style={{ fontSize: 12 }}
          >
          Twitter:  {this.props.official.twitter}, Facebook: { this.props.official.facebook }
          </BaseText>
        </View>
      </TouchableOpacity>
    )
  }
}

OfficialListItem.propTypes = {
  official: propType(OfficialListItem.fragments.official).isRequired,
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
