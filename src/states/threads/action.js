import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'threads/RECEIVE_THREADS',
  CREATE_THREAD: 'threads/CREATE_THREAD',
  UPVOTE_THREAD: 'threads/UPVOTE_THREAD',
  DOWNVOTE_THREAD: 'threads/DOWNVOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function createThreadActionCreator(thread) {
  return {
    type: ActionType.CREATE_THREAD,
    payload: {
      thread,
    },
  };
}

function upVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncPopulateThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threads = await api.getThreads();
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncCreateThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(createThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(upVoteActionCreator({ threadId, userId: authUser.id }));
    try {
      await api.toggleVotedThread(threadId, 1);
    } catch (error) {
      alert(error.message);
      dispatch(downVoteActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(downVoteActionCreator({ threadId, userId: authUser.id }));
    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(upVoteActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  createThreadActionCreator,
  upVoteActionCreator,
  asyncPopulateThreads,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncCreateThread,
};
