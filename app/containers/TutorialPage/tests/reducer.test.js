import { fromJS } from 'immutable';
import tutorialPageReducer from '../reducer';

describe('tutorialPageReducer', () => {
  it('returns the initial state', () => {
    expect(tutorialPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
