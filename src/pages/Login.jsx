import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const isFirst = location.state?.state || false;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState({ 'state': false, 'message': "" });

  function handleSubmit(event) {
    event.preventDefault();
    axios.post('http://localhost:8080/user/login', { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        if (isFirst) {
          navigate('/profile', { state: { firstLogin: true } });
        } else {
          navigate('/profile');
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <>
      <div className={`flex flex-row h-screen w-screen`}>
        <div className="flex justify-center w-1/2 bg-gradient-to-b from-cyan-500 to-blue-500">
          <div className="flex flex-col justify-center m-8">

          </div>
        </div>
        <div className="flex justify-center w-1/2">
          <div className="flex flex-col justify-center m-6">
            <p className="flex justify-center mb-4 text-3xl font-bold text-slate-600">
              User Login
            </p>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-4 mb-4">
                <input
                  type="email"
                  className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="InputEmail"
                  placeholder="Email"
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                />
                <input
                  type="password"
                  className="shadow appearance-none border rounded-3xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="InputPassword"
                  placeholder="********"
                  onChange={(event) =>
                    setPassword(event.target.value)
                  }
                />
              </div>
              <div className="flex flex-col mb-4">
                <div className="flex flex-row justify-between ">
                  <label>
                    <input
                      type="checkbox"
                      className="w-4 h-4S bg-gray-100 border-gray-300 rounded"
                      id="CheckRememberMe"
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <a className="ml-2 text-xs font-medium text-gray-400">
                      Remember Me
                    </a>
                  </label>
                  <div>
                    <a className="font-bold text-xs text-blue-900" href="#">
                      Forgot Password?
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <button type="submit" className="bg-blue-900 text-white shadow font-bold py-2 rounded-lg">
                  Log In
                </button>
                <button type="button" className="bg-red-500 text-white shadow font-bold py-2 rounded-lg" onClick={() => navigate("/signup")}>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}