import { ActionType } from './action';

function threadDetailReducer(detailThread = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.detailThread;
    case ActionType.ADD_COMMENT:
      return {
        ...detailThread,
        comments: [...detailThread.comments, action.payload.comment],
      };
    default:
      return detailThread;
  }
}

export default threadDetailReducer;
