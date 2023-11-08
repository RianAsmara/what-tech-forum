import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function CommentInput({ addComment }) {
  const [comment, onChangeComment, setComment] = useInput('');

  const onCommentSubmit = (event) => {
    event.preventDefault();
    addComment(comment);
    setComment('');
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={onCommentSubmit}>
      <textarea name="" id="" cols="30" rows="10" value={comment} onChange={onChangeComment} />
      <button className="btn btn-primary text-gray-50" type="submit">kirim komentar</button>
    </form>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;
