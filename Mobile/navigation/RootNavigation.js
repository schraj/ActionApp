import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import { Font } from 'exponent';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';
import {
  Ionicons,
} from '@exponent/vector-icons';
import { BaseText } from '../components/BaseText';

import Colors from '../constants/Colors';
import Router from './Router';

const defaultRouteConfig = {
  navigationBar: {
    tintColor: Colors.navigationBarTintColor,
    backgroundColor: Colors.navigationBarBackgroundColor,
    titleStyle: Font.style('lato-bold'),
  },
};

export default class RootNavigation extends React.Component {
  render() {
    return (
      <TabNavigation
        tabBarHeight={56}
        id="main"
        navigatorUID="main"
        initialTab="issues">
        <TabNavigationItem
          id="issues"
          renderIcon={isSelected => this._renderIcon('Your Issues', 'ios-paper', isSelected)}>
          <StackNavigation
            defaultRouteConfig={defaultRouteConfig}
            initialRoute={Router.getRoute('issueList')}
          />
        </TabNavigationItem>
        <TabNavigationItem
          id="settings"
          renderIcon={isSelected => this._renderIcon('Settings', 'ios-add-circle', isSelected)}>
          <StackNavigation
            defaultRouteConfig={defaultRouteConfig}
            initialRoute={Router.getRoute('settings')}
          />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderIcon(title, iconName, isSelected) {
    let color = isSelected ? Colors.tabIconSelected : Colors.tabIconDefault;

    return (
      <View style={styles.tabItemContainer}>
        <Ionicons
          name={`${iconName}${!isSelected ? '-outline' : ''}`}
          size={28}
          color={color}
        />
        <BaseText
          fontFace="lato-bold"
          style={[styles.tabTitleText, {color}]}
          numberOfLines={1}
        >
          {title}
        </BaseText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabTitleText: {
    fontSize: 11,
  },
});
