import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function ThreadInput({ createThread }) {
  const [title, onTitleChange] = useInput('');
  const [thread, onThreadChange] = useInput('');
  const [category, onCategoryChange] = useInput('');

  return (
    <form className="flex flex-col justify-center gap-5 w-96">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-lg">Title</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={title}
          onChange={onTitleChange}
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-lg">Thread</span>
        </label>
        <textarea
          className="border border-gray-300 rounded-md p-2"
          cols="30"
          rows="10"
          value={thread}
          onChange={onThreadChange}
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-lg">Category</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          value={category}
          onChange={onCategoryChange}
        />
      </div>
      <button className="btn btn-secondary text-white" type="button" onClick={() => createThread({ title, thread, category })}>Crete Thread</button>
    </form>
  );
}

ThreadInput.propTypes = {
  createThread: PropTypes.func.isRequired,
};

export default ThreadInput;
