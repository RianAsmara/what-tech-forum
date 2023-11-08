import React from 'react';
import { IoPeople } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // @TODO: get dispatch function from store

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  return (
    <section className="h-screen grid grid-cols-2">
      <header className="flex justify-center items-center bg-secondary text-white">
        <h1 className="text-9xl text-secondary-content"><IoPeople /></h1>
      </header>
      <article className="flex flex-col justify-center p-5 gap-2">
        <h2>Create your account</h2>
        <RegisterInput register={onRegister} />

        <p>
          Already have an account?
          {' '}
          <Link to="/" className="text-secondary">Login</Link>
        </p>
      </article>
    </section>
  );
}

export default RegisterPage;
