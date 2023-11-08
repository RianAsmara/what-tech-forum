import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadsList from '../components/ThreadsList';
import { asyncPopulateLeaderboards } from '../states/leaderboards/action';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import Sidebar from '../components/Sidebar';
import { asyncDownVoteThread, asyncUpVoteThread } from '../states/threads/action';

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  const onUpVoteThread = (id) => {
    dispatch(asyncUpVoteThread(id));
  };

  const onDownVoteThread = (id) => {
    dispatch(asyncDownVoteThread(id));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    authUser,
    owner: users.find((user) => user.id === thread.ownerId),
  }));

  return (
    <div className="!max-w-7xl mx-auto">
      <section className="flex flex-row gap-3 mx-5 my-3">
        <Sidebar creator={authUser} />
        {
          threadList.length > 0 ? (
            <ThreadsList
              threads={threadList}
              upVote={onUpVoteThread}
              downVote={onDownVoteThread}
            />
          ) : (
            <div
              className="
            p-4
            rounded-md
            shadow-sm
            border
            border-neutral-200
            bg-gray-300
            text-center
          "
            >
              Tidak ada thread
            </div>
          )
        }

      </section>
    </div>
  );
}

export default HomePage;
