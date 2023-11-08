import {
  afterEach, beforeEach, describe, expect, it, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncPopulateUsersAndThreads } from './action';
import { receiveUsersActionCreator } from '../users/action';
import { asyncPopulateLeaderboards, receiveLeaderboardsActionCreator } from '../leaderboards/action';
import { receiveThreadsActionCreator } from '../threads/action';

const fakeThreadResponse = [
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
];

const fakeUsersResponse = [
  {
    id: 'user-aROWej8yYA1sOfHN',
    name: 'Dicoding',
    email: 'admin@dicoding.com',
    avatar: 'https://ui-avatars.com/api/?name=Dicoding&background=random',
  },
];

const fakeLeaderboardsResponse = [
  {
    user: {
      id: 'user-mQhLzINW_w5TxxYf',
      name: 'Dimas Saputra',
      email: 'dimas@dicoding.com',
      avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
    },
    score: 25,
  },
];

const fakeErrorResponse = new Error('ups, something went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    api._getAllUsers = api.getAllUsers;
    api._getThreads = api.getThreads;
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getAllUsers = api._getAllUsers;
    api.getThreads = api._getThreads;
    api.getLeaderboards = api._getLeaderboards;

    delete api._getAllUsers;
    delete api._getLeaderboards;
    delete api._getThreads;
  });

  it('should dispatch action users with loading correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.resolve(fakeUsersResponse);
    // api.getAllLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action threads with loading correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getThreads = () => Promise.resolve(fakeThreadResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadsActionCreator(fakeThreadResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action leaderboards with loading correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncPopulateLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.getAllUsers = () => Promise.reject(fakeErrorResponse);
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // mock alert
    window.alert = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
