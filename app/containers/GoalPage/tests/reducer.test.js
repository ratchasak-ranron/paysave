import { fromJS } from 'immutable';
import goalPageReducer from '../reducer';

describe('goalPageReducer', () => {
  it('returns the initial state', () => {
    expect(goalPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
