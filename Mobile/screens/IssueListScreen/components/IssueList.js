import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ListView,
  ActivityIndicator,
  ScrollView
} from 'react-native';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { filter } from 'graphql-anywhere';

import { createFocusAwareComponent } from '@exponent/ex-navigation';

import { BaseText } from '../../../components/BaseText';

import { IssueListItem } from './IssueListItem';
import { Title } from './Title';

@createFocusAwareComponent
export class IssueList extends Component {
  constructor(props){
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    });
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (!data.loading && !data.error) {
      const { dataSource } = this.state;
      this.setState({
        dataSource: dataSource.cloneWithRows(data.Channel.issues),
      });
      if (nextProps.isFocused && !this.props.isFocused) {
        this.props.data.refetch();
      }
    }
  }

  render() {
    if (this.props.data.error) {
      return (
        <View style={styles.container} >
          <BaseText
            fontFace="source-sans"
            style={{fontSize: 14, color: 'red'}}
          >
            Error getting data
          </BaseText>
        </View>
      );
    }

    if (this.props.data.loading) {
      return (
        <View style={styles.container} >
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ListView
        enableEmptySections
        dataSource={this.state.dataSource}
        renderRow={this._renderItem}
        renderHeader={this._renderHeader}
        renderScrollComponent={props => <ScrollView {...props} />}
        renderSeparator={this._renderSeparator}
        style={styles.listView}
        pageSize={1}
        initialListSize={10}
      />
    );
  }

  _renderItem = (issue) => (
    <IssueListItem 
      issue={filter(IssueListItem.fragments.issue, issue)} 
      onPress={this.props.onRowPress}
    />
  );

  _renderHeader = (channel) => (
    <Title 
      channel={filter(Title.fragments.channel, this.props.data.Channel)} 
    />
  );

  _renderSeparator = (sectionID, rowID) => (
    <View
      key={`${sectionID}-${rowID}`}
      style={{
        height: 1,
        backgroundColor: '#CCCCCC',
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ChannelQuery = gql`
  query {
    Channel(channelName: "Democracy") {
      id
      channelName
      channelDescription
      issues {
        ...IssueListItemIssue
      }
    }
  }
  ${IssueListItem.fragments.issue}
`

export const IssueListWithData = graphql(ChannelQuery)(IssueList)
