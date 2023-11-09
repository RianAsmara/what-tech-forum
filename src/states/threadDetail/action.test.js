import {
  afterEach, beforeEach, describe, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { asyncReceiveThreadDetail, receiveThreadDetailActionCreator } from './action';

const fakeThreadDetail = [
  {
    id: 'thread-Np47p4jhUXYhrhRn',
    title: 'Bagaimana pengalamanmu belajar Redux?',
    body: 'Coba ceritakan dong, gimana pengalaman kalian belajar Redux di Dicoding?',
    createdAt: '2023-05-29T07:55:52.266Z',
    owner: {
      id: 'user-mQhLzINW_w5TxxYf',
      name: 'Dimas Saputra',
      avatar: 'https://ui-avatars.com/api/?name=Dimas Saputra&background=random',
    },
    category: 'redux',
    comments: [
      {
        id: 'comment-8atq4CAB2-C_K5Wq',
        content: 'hallo',
        createdAt: '2023-11-09T01:05:19.798Z',
        owner: {
          id: 'user-xP1-W4Tt8huRMLM_',
          name: 'memet',
          avatar: 'https://ui-avatars.com/api/?name=memet&background=random',
        },
        upVotesBy: [],
        downVotesBy: [],
      },
    ],
    upVotesBy: [],
    downVotesBy: [],
  },
];

const fakeErrorResponse = new Error('thread tidak ditemukan');

describe('asyncReceiveThreadDetail thunk', () => {
  beforeEach(() => {
    api._getThreadDetail = api.getThreadDetail;
  });

  afterEach(() => {
    api.getThreadDetail = api._getThreadDetail;

    delete api._getThreadDetail;
  });

  it('should dispatch action users with loading correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.getThreadDetail = () => Promise.resolve(fakeThreadDetail);
    // api.getAllLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncReceiveThreadDetail()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(fakeThreadDetail));
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
    await asyncReceiveThreadDetail()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
