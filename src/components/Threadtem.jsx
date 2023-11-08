import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  FaComments, FaRegThumbsDown, FaRegThumbsUp,
} from 'react-icons/fa';
import HTMLReactParser from 'html-react-parser';
import { postedAt } from '../utils';

function ThreadItem({
  id,
  body,
  title,
  createdAt,
  category,
  owner,
  totalComments,
  upVotesBy,
  downVotesBy,
  upVote,
  downVote,
}) {
  const navigate = useNavigate();

  const onThreadClick = () => {
    navigate(`/thread/${id}`);
  };

  const isUpVoted = upVotesBy.includes(owner.id);
  const isDownVoted = downVotesBy.includes(owner.id);

  return (
    <div className="flex flex-row gap-3 p-5 bg-gray-300 rounded-md">
      <div>
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img
              src={owner.avatar}
              alt={owner.name}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <header>
          <div
            role="button"
            tabIndex={0}
            onClick={onThreadClick}
            onKeyDown={onThreadClick}
          >
            <h1
              className="capitalize text-lg font-medium"
            >
              {title}
            </h1>
          </div>
          <div className="flex flex-row">
            <small className="font-medium">
              posted
              {' '}
              {postedAt(createdAt)}
              {' '}
              by
              {' '}
              {owner.name}
            </small>
          </div>
        </header>
        <article>
          <div className="whitespace-pre-line">{HTMLReactParser(body)}</div>
        </article>
        <span className="text-blue-600">
          #
          {category}
        </span>
        <div className="flex flex-row gap-2 items-center">
          {isUpVoted ? (
            <button
              onClick={upVote}
              type="button"
              className="flex flex-row gap-2 items-center cursor-pointer"
            >
              { upVotesBy.length }
              <FaRegThumbsUp />
            </button>
          ) : (
            <button
              onClick={upVote}
              type="button"
              className="flex flex-row gap-2 items-center cursor-pointer"
            >
              {upVotesBy.length}
              <FaRegThumbsUp />
            </button>
          )}

          {isDownVoted ? (
            <button
              onClick={downVote}
              type="button"
              className="flex flex-row gap-2 items-center cursor-pointer"
            >
              { downVotesBy.length }
              <FaRegThumbsDown />
            </button>
          ) : (
            <button
              onClick={downVote}
              type="button"
              className="flex flex-row gap-2 items-center cursor-pointer"
            >
              { downVotesBy.length }
              <FaRegThumbsDown />
            </button>
          )}

          { totalComments }
          {' '}
          <FaComments />
        </div>
      </div>
    </div>
  );
}

const creatorShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  owner: PropTypes.shape(creatorShape).isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,

};

ThreadItem.propTypes = {
  ...threadItemShape,
  // like: PropTypes.func,
};

ThreadItem.defaultProps = {
  like: null,
};

export { threadItemShape };

export default ThreadItem;
