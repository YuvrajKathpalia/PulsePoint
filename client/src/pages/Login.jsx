import React from 'react';

const Login = () => (
  <div className="mt-8">
    <h2 className="text-2xl font-bold">Login</h2>
    <form className="mt-4">
      <label className="block mb-2">
        Email:
        <input type="email" className="w-full p-2 border rounded" />
      </label>
      <label className="block mb-2">
        Password:
        <input type="password" className="w-full p-2 border rounded" />
      </label>
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Login
      </button>
    </form>
  </div>
);

export default Login;

