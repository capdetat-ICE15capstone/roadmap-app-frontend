import React, { useState } from 'react'
import PropTypes, { func } from 'prop-types';
import Signup from './Signup';

async function loginUser(credentials) {
  return fetch('http://localhost:5173/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Login({ setToken }) {
  // const navigate = useNavigate();
  const [signupVisibility, setSingupVisibility] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password
    });
    setToken(token);
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-200 relative">
        <div className="flex bg-white rounded shadow-xl m-auto">
          <div className="flex flex-col m-6">
            <p className="flex justify-center mb-4 text-3xl font-bold text-slate-600">
              User Login
            </p>
            <form id="login-form" onSubmit={handleSubmit}>
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
                <button type="button" onClick={() => setSingupVisibility(!signupVisibility)} className="bg-red-900 text-white shadow font-bold py-2 rounded-lg">
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

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}