import {
  createRouter,
} from '@exponent/ex-navigation';

import IssueListScreen from '../screens/IssueListScreen';
import IssueDetailScreen from '../screens/IssueDetailScreen';
import ActionDetailScreen from '../screens/ActionDetailScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  issueList: () => IssueListScreen,
  issueDetail: () => IssueDetailScreen,
  actionDetail: () => ActionDetailScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
}));
