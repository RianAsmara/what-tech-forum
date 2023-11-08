import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ThreadInput from '../components/ThreadInput';
import { asyncCreateThread } from '../states/threads/action';

function CreateThreadPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCreateThread = ({ title, thread, category }) => {
    dispatch(asyncCreateThread({ title, body: thread, category }));
    navigate('/');
  };
  return (
    <div className="!max-w-7xl mx-auto ">
      <section className="flex flex-row  gap-3 mx-5 my-3 justify-center">
        <ThreadInput createThread={onCreateThread} />
      </section>
    </div>
  );
}

export default CreateThreadPage;
