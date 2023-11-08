import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateLeaderboards } from '../states/leaderboards/action';

function LeaderboardPage() {
  const {
    leaderboards = [],
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateLeaderboards());
  }, [dispatch]);

  const leaderboardList = leaderboards.map((leaderboard) => ({
    ...leaderboard,
  }));

  return (
    <div className="!max-w-7xl mx-auto">
      <div className="card w-[50rem] rounded-md">
        <div className="card-body">
          <h2 className="card-title">Leaderboards</h2>
          <small>Top 1 Most Active Users</small>
          <hr className="border-black" />
          {leaderboardList.map((leaderboard) => (
            <ol className="card hover:bg-gray-200 cursor-pointer rounded-md p-3">
              <li
                className="flex flex-row gap-5 align-middle capitalize"
                key={leaderboard.user.id}
              >
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img
                      src={leaderboard.user.avatar}
                      alt={leaderboard.user.name}
                    />
                  </div>
                </div>
                <p>{leaderboard.user.name}</p>
                <p className="text-right">{leaderboard.score}</p>
              </li>
            </ol>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPage;
