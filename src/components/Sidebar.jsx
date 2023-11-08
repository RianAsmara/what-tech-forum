import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

function Sidebar({ creator }) {
  const { avatar, name, id } = creator;

  return (
    <aside className="sticky w-80 top-20 p-4 h-24">
      {
        creator ? (
          <div className="card card-side bg-base-100 shadow-xl mb-5 rounded-md">
            <div className="card-body">
              <div className="flex flex-col gap-2 text-center items-center">
                <div className="avatar">
                  <div className="w-24 rounded-full">
                    <img src={avatar} alt={id} />
                  </div>
                </div>
                <p className="text-lg font-bold">{ name }</p>
                <small className="text-xs">
                  @
                  { id }
                </small>
              </div>
            </div>
          </div>
        ) : null
      }
      <Link to="/create-thread" className="btn btn-md w-full my-3">
        <FaPlus />
        {' '}
        Create Thread
      </Link>
      <ul>
        <li>
          <Link
            className="
              block
              p-2
              hover:bg-neutral-200
              hover:dark:bg-gray-100
              rounded-md
              bg-neutral-200 dark:bg-gray-100
            "
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className="
              block
              p-2
              hover:bg-neutral-200
              hover:dark:bg-gray-300
              rounded-md

            "
            to="/leaderboards"
          >
            Leaderboards
          </Link>
        </li>
        <li>
          <Link
            className="
              block
              p-2
              hover:bg-neutral-200
              hover:dark:bg-gray-300
              rounded-md

            "
            to="/profile"
          >
            Profile
          </Link>
        </li>
      </ul>
    </aside>
  );
}

const creatorShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,

};

Sidebar.propTypes = {
  creator: PropTypes.shape(creatorShape).isRequired,
};

export default Sidebar;
