import React from 'react';
import { IoPeople } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="h-screen grid grid-cols-2">
      <header className="flex justify-center items-center bg-secondary text-white">
        <h1 className="text-9xl text-secondary-content"><IoPeople /></h1>
      </header>
      <article className="flex flex-col justify-center p-5 gap-2">
        <h2 className="text-4xl">
          See Latest Tech News
          <br />
          Through
          {' '}

          {' '}
          <strong className="text-secondary">What Tech Forum</strong>
        </h2>

        <LoginInput login={onLogin} />
        <p>
          Don&apos;t have an account?
          {' '}
          <Link to="/register" className="text-secondary">Register</Link>
        </p>
      </article>
    </section>
  );
}

export default LoginPage;
