import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem, { threadItemShape } from './Threadtem';

function ThreadsList({ threads, upVote, downVote }) {
  return (
    <div className="flex flex-col gap-2">
      {
        threads.map((thread) => (
          <ThreadItem
            key={thread.id}
            upVote={upVote}
            downVote={downVote}
            {...thread}
          />
        ))
      }
    </div>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
};

export default ThreadsList;
