import { fromJS } from 'immutable';
import settingPageReducer from '../reducer';

describe('settingPageReducer', () => {
  it('returns the initial state', () => {
    expect(settingPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
