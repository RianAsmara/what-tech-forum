import React from 'react';
import PropTypes from 'prop-types';
import HTMLReactParser from 'html-react-parser';
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { postedAt } from '../utils';
import Sidebar from './Sidebar';
import CommentInput from './CommentInput';
import { asyncAddComment } from '../states/threadDetail/action';

function ThreadDetail({
  id, body, title, createdAt, comments, owner,
}) {
  const dispatch = useDispatch();
  const onAddComment = (message) => {
    dispatch(asyncAddComment({ threadId: id, content: message }));
  };
  return (
    <div className="flex flex-row">
      <Sidebar creator={owner} />
      <div className="flex flex-col w-full">
        <section className="bg-gray-300 rounded-md p-5 my-5">
          <header>
            <h1 className="capitalize text-2xl font-medium">{title}</h1>
            <small className="font-medium text-gray-500">{postedAt(createdAt)}</small>
          </header>
          <article className="prose">
            <p>{HTMLReactParser(body)}</p>
          </article>
        </section>

        <h1 className="text-2xl font-bold">
          {comments.length}
          { ' ' }
          Komentar
        </h1>
        <section className="bg-gray-300 rounded-md p-5 my-5">
          <CommentInput addComment={onAddComment} />
          {
            comments.length > 0 ? (
              <ul>
                {
              comments.map((cmnt) => (
                <div className="card card-side bg-base-100 shadow-xl mt-5" key={cmnt.id}>
                  <figure className="w-36">
                    <img className="h-full" src={cmnt.owner.avatar} alt={cmnt.owner.id} />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">
                      { cmnt.owner.name }
                      {' '}
                      -
                      {' '}
                      <small className="font-normal text-xs">{ postedAt(cmnt.createdAt) }</small>
                    </h2>
                    <div className="whitespace-pre-line">{ HTMLReactParser(cmnt.content) }</div>
                    <div className="card-actions align-middle  justify-end">
                      <div className="p-2 flex flex-row align-middle gap-3">
                        <FaThumbsUp />
                        { cmnt.downVotesBy.length }
                      </div>
                      <div className="flex flex-row align-middle gap-3">
                        <FaThumbsDown />
                        { cmnt.upVotesBy.length }
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
              </ul>
            ) : (
              <p>No Comment</p>
            )
          }
        </section>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  comments: PropTypes.shape(commentShape).isRequired,
  owner: PropTypes.shape(userShape).isRequired,
};

export default ThreadDetail;
