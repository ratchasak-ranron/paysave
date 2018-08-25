import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the goalPage state domain
 */

const selectGoalPageDomain = state => state.get('goalPage', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by GoalPage
 */

const makeSelectGoalPage = () =>
  createSelector(selectGoalPageDomain, substate => substate.toJS());

export default makeSelectGoalPage;
export { selectGoalPageDomain };
