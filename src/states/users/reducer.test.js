/**
* test scenario for talksReducer
*
* - usersReducer function
*  - should return the initial state when given by unknown action
*  - should return the talks when given by users/RECEIVE_USERS action
*
*/

import { describe, expect, it } from 'vitest';
import threadsReducer from './reducer';

describe('usersReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    it('should return the initial state when given by unknown action', () => {
      // arrange
      const initialState = [];
      const action = { type: 'UNKNOWN' };
      // action
      const nextState = threadsReducer(initialState, action);
      // assert
      expect(nextState).toEqual(initialState);
    });
  });

  it('should return the thread when given by users/RECEIVE_USERS action', () => {
    // arrange
    const initialState = [];

    const action = {
      type: 'users/RECEIVE_USERS',
      payload: {
        users: [
          {
            id: 'user-aROWej8yYA1sOfHN',
            name: 'Dicoding',
            email: 'admin@dicoding.com',
            avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.users);
  });
});
