import React, { useState } from 'react'
import PropTypes, { func } from 'prop-types';
import Signup from './Signup';

async function loginUser(credentials) {
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

export default function Login({ setToken }) {
  const [signupVisibility, setSingupVisibility] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [agreement, setAgreement] = useState(false);

  const handleSubmit = async e => {
    if (!(/\S+@\S+\.\S+/.test(email))) {
      return console.log("invalid email address");
    }
    e.preventDefault();
    console.log("test");
    const token = await loginUser({
      email,
      password
    });
    setToken(token);
  }

  const handleSignupSubmit = (event) => {
    event.preventDefault();

    if (email === "" || firstName === "" || lastName === "" || username === "" || password === "" || passwordConfirm === "") {
      console.log("all form must be filled");
      return;
    }
    if (specialChars.test(firstName)) {
      console.log("invalid first name");
      return;
    }
    if (specialChars.test(lastName)) {
      console.log("invalid last name");
      return;
    }
    if (firstName.length > 255) {
      console.log("Please shorten your first name");
      return;
    }
    if (lastName.length > 255) {
      console.log("Please shorten your last name");
      return;
    }
    if (specialChars.test(username)) {
      console.log("invalid username");
      return;
    }
    if (username.length > 24) {
      console.log("username is too long");
      return;
    }
    if (password.length < 8) {
      console.log("password too short");
      return;
    }
    if (password.length > 24) {
      console.log("password too long");
      return;
    }
    if (password !== passwordConfirm) {
      console.log("password does not match");
      return;
    }
    if (!agreement) {
      console.log("agreement must be set to TRUE");
      return;
    }
  }

  return (
    <>
      <div className='relative'>
        <LoginForm
          setEmail={setEmail}
          setPassword={setPassword}
          setRememberMe={setRememberMe}
          rememberMe={rememberMe}
          handleSubmit={handleSubmit}
          signupVisibility={signupVisibility}
          setSingupVisibility={setSingupVisibility}
        />
        <SignupForm
          setUsername={setUsername}
          setFirstName={setFirstName}
          setLastName={setLastName}
          setEmail={setEmail}
          setPassword={setPassword}
          setPasswordConfirm={setPasswordConfirm}
          setAgreement={setAgreement}
          agreement={agreement}
          handleSignupSubmit={handleSignupSubmit}
          setSingupVisibility={setSingupVisibility}
          signupVisibility={signupVisibility}
        />
      </div>
    </>
  )
}

function LoginForm({
  setEmail,
  setPassword,
  setRememberMe,
  rememberMe,
  handleSubmit,
  signupVisibility,
  setSingupVisibility }) {
  return (
    <div className={`flex flex-col h-screen w-screen bg-gray-200 absolute`}>
      <div className="flex bg-white rounded shadow-xl m-auto">
        <div className="flex flex-col m-6">
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
              <button type="button" onClick={() => setSingupVisibility(!signupVisibility)} className="bg-red-500 text-white shadow font-bold py-2 rounded-lg">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function SignupForm({
  setUsername,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setPasswordConfirm,
  setAgreement,
  agreement,
  handleSignupSubmit,
  setSingupVisibility,
  signupVisibility }) {
  return (
    <div className={`flex flex-col h-screen w-screen absolute ${(signupVisibility) ? 'visible' : 'hidden'}`}>
      <div className="flex flex-col h-screen bg-black bg-opacity-50">
        <div className="flex bg-white rounded shadow-lg max-w-3xl m-auto">
          <div className="flex flex-col m-8">
            <p className="text-center mb-4 text-3xl font-bold text-slate-600">
              Create Account
            </p>
            <form id="register-form" onSubmit={handleSignupSubmit}>
              <div className="flex flex-col space-y-2 mb-4">
                <div className="flex flex-col">
                  <label>
                    <p className="text-gray-600 text-xs mb-1">
                      Email Address
                    </p>
                    <input
                      type="email"
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="InputEmail"
                      placeholder="Email Address"
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                    />
                  </label>
                </div>
                <div className="flex flex-row justify-between space-x-4">

                  <label>
                    <p className="text-gray-600 text-xs mb-1">
                      First Name
                    </p>
                    <input
                      type="firstname"
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="InputFirstName"
                      placeholder="First Name"
                      onChange={(event) =>
                        setFirstName(event.target.value)
                      }
                    />
                  </label>
                  <label>
                    <p className="text-gray-600 text-xs mb-1">
                      Last Name
                    </p>
                    <input
                      type="lastname"
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="InputLastName"
                      placeholder="Last Name"
                      onChange={(event) =>
                        setLastName(event.target.value)
                      }
                    />
                  </label>
                </div>
                <div className="flex flex-col">
                  <label>
                    <p className="text-gray-600 text-xs mb-1">
                      Username
                    </p>
                    <input
                      type="username"
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="InputUsername"
                      placeholder="Username"
                      onChange={(event) =>
                        setUsername(event.target.value)
                      }
                    />
                  </label>
                </div>
                <div className="flex flex-row justify-between space-x-4">
                  <label>
                    <p className="text-gray-600 text-xs mb-1">
                      Password
                    </p>
                    <input
                      type="password"
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="InputPassword"
                      placeholder="********"
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                    />
                  </label>
                  <label>
                    <p className="text-gray-600 text-xs mb-1">
                      Confirm Password
                    </p>
                    <input
                      type="password"
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="InputPasswordConfirm"
                      placeholder="********"
                      onChange={(event) =>
                        setPasswordConfirm(event.target.value)
                      }
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <label className="ml-2 text-xs font-medium text-gray-400">
                  <input
                    type="checkbox"
                    className="w-4 h-4S mr-1 bg-gray-100 border-gray-300 rounded"
                    id="CheckAgree"
                    onChange={() => setAgreement(!agreement)}
                  />
                  I have agreed to
                  <a href="#" className="ml-1 text-xs font-bold text-gray-400">
                    ayayayayayaya
                  </a>
                </label>
                <button type="submit" className="bg-red-500 text-white shadow font-bold py-2 grow rounded-3xl focus:outline-none focus:shadow-outline">
                  Sign Up
                </button>
              </div>
            </form>
            <div className="flex justify-center mt-4">
              <button type="button" onClick={() => setSingupVisibility(!signupVisibility)} className="text-xs font-light text-gray-400">
                Alrady have an account?
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired
};