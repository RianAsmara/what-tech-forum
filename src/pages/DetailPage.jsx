import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveThreadDetail } from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';

function DetailPage() {
  const { id } = useParams();

  const {
    threadDetail = null,
    authUser,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  if (!threadDetail) {
    return null;
  }

  return (
    <section className="!max-w-7xl mx-auto">
      <ThreadDetail {...threadDetail} authUser={authUser} />
    </section>
  );
}

export default DetailPage;
