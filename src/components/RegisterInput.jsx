import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="flex flex-col justify-center gap-5">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-lg">Name</span>
        </label>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Masukkan Nama"
          value={name}
          onChange={onNameChange}
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-lg">Email</span>
        </label>
        <input
          type="email"
          className="input input-bordered w-full"
          placeholder="Masukkan Email"
          value={email}
          onChange={onEmailChange}
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-lg">Password</span>
        </label>
        <input
          type="password"
          className="input input-bordered w-full"
          placeholder="Masukkan Password"
          value={password}
          onChange={onPasswordChange}
        />
        <label className="label">
          <label className="label cursor-pointer">
            <input type="checkbox" className="checkbox checkbox-xs" />
            <span className="label-text ml-1">Show Password</span>
          </label>
        </label>
      </div>
      <button className="btn btn-secondary text-white" type="button" onClick={() => register({ name, email, password })}>Register</button>
    </form>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
