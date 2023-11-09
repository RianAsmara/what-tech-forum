import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <form className="flex flex-col justify-center gap-5">
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-lg">Email</span>
        </label>
        <input
          placeholder="Masukkan Email"
          type="email"
          className="input input-bordered w-full"
          value={email}
          onChange={onEmailChange}
        />
      </div>

      <div className="form-control w-full">
        <label className="label">
          <span className="label-text text-lg">Password</span>
        </label>
        <input
          placeholder="Masukkan Password"
          type="password"
          className="input input-bordered w-full"
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
      <button className="btn btn-secondary text-white" type="button" onClick={() => login({ email, password })}>Login</button>
    </form>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
