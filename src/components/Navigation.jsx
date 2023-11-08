import React from 'react';
import PropTypes from 'prop-types';
import { FaMoon } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Navigation({ authUser, signOut }) {
  const { avatar, name } = authUser;

  return (
    <div className="flex flex-row justify-between items-center max-h-14 p-5 mx-auto bg-gray-400 shadow-lg ">
      <h1>
        <Link to="/">What Tech Forum</Link>
      </h1>

      <div className="flex flex-row justify-between relative">
        <form>
          <input id="search-input" type="text" className="border-0 rounded-md w-96 bg-gray-300 py-1 px-5" placeholder="Type and hit enter" />
        </form>
      </div>

      <div className="flex flex-row gap-5">
        <button className="block w-8 h-8 rounded-full bg-neutral-300  text-center mr-2 " type="button">
          <FaMoon />
        </button>
        <button className="block w-8 h-8 rounded-full bg-neutral-300  text-center mr-2 " type="button">EN</button>
        <button type="button" onClick={signOut}>
          <div className="avatar online">
            <div className="w-8 rounded-full">
              <img
                src={avatar}
                alt={name}
              />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,

};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
