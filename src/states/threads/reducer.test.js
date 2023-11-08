/**
* test scenario for talksReducer
*
* - talkReducers function
*  - should return the initial state when given by unknown action
*  - should return the talks when given by RECEIVE_THREADS action
*  - should return new thread when given by CREATE_THREAD action
*
*/

import { describe, expect, it } from 'vitest';
import threadsReducer from './reducer';

describe('threadReducers function', () => {
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

  it('should return the thread when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];

    const action = {
      type: 'threads/RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-Np47p4jhUXYhrhRn',
            title: 'Bagaimana pengalamanmu belajar Redux?',
            body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
            category: 'redux',
            createdAt: '2023-05-29T07:55:52.266Z',
            ownerId: 'user-mQhLzINW_w5TxxYf',
            totalComments: 0,
            upVotesBy: [],
            downVotesBy: [],
          },
          {
            id: 'thread-91KocEqYPRz68MhD',
            title: 'Halo! Selamat datang dan silakan perkenalkan diri kamu',
            body: 'test',
            category: 'perkenalan',
            createdAt: '2023-05-29T07:54:35.746Z',
            ownerId: 'user-aROWej8yYA1sOfHN',
            totalComments: 1,
            upVotesBy: [
              'user-mQhLzINW_w5TxxYf',
            ],
            downVotesBy: [],
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return new thread when given by CREATE_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
      },
    ];
    const action = {
      type: 'threads/CREATE_THREAD',
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };
    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });
});
