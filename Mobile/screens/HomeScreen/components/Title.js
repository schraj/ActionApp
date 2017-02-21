import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'


import { BaseText } from '../../../components/BaseText';

export class Title extends React.Component {
  static propTypes = {
    data: React.PropTypes.object.isRequired,
  }

  render() {
    if (this.props.data.error) {
      return (
        <BaseText
          fontFace="source-sans"
          style={{fontSize: 14, color: 'red'}}
        >
          Error getting channel
        </BaseText>
      );
    }

    if (this.props.data.loading) {
      return <ActivityIndicator />
    }
    
    return (
      <BaseText
        fontFace="source-sans"
        style={{fontSize: 18}}
      >
        Channel: {this.props.data.Channel.channelName}
      </BaseText>
    )
  }
}

const ChannelQuery = gql`query($channelName: String!) {
  Channel(channelName: $channelName) {
    channelName
    channelName
    channelDescription
    issues{
      issueName
      issueDescription
    }
  }
}`

export const TitleWithData = graphql(ChannelQuery, {
options: {
    variables: {
      channelName: "Democracy"
    }
  }
})(Title)
