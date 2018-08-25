import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the settingPage state domain
 */

const selectSettingPageDomain = state => state.get('settingPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by SettingPage
 */

const makeSelectSettingPage = () =>
  createSelector(selectSettingPageDomain, substate => substate.toJS());

export default makeSelectSettingPage;
export { selectSettingPageDomain };
