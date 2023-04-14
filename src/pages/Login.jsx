import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../functions/axiosInstance';

import Prompt from '../components/Prompt';
import Spinner from '../components/Spinner';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rememberMe, setRememberMe] = useState(false);

  const [isWarning, setIsWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [failMessage, setFailMessage] = useState();

  // Check if there is a saved login information on first render.
  useEffect(() => {
    if (localStorage.getItem('saved_email') !== null && localStorage.getItem('saved_password') !== null) {
      const submission = {
        "email": localStorage.getItem('saved_email'),
        "password": localStorage.getItem('saved_password')
      };
      submitForm(submission);
    }
  }, [])

  function handleSubmit(event) {
    event.preventDefault();
    const submission = {
      "email": email,
      "password": password
    };
    if (rememberMe) {
      localStorage.setItem('saved_email', email);
      localStorage.setItem('saved_password', password);
    }
    submitForm(submission);
  }

  async function submitForm(form) {
    setIsLoading(true);
    const route = `/user/login/`;
    axiosInstance.post(route, form)
      .then((response) => {
        console.log(response.data.detail);
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/');
      })
      .catch((error) => {
        console.error(error.response.data.detail);
        setFailMessage(error.response.data.detail);
        setIsLoading(false);
        setIsWarning(true);
      });
  }

  return (
    <>
      <div className={`relative flex flex-row h-screen w-screen bg-gradient-to-b from-sub-blue to-main-blue overflow-y-auto py-8`}>
        <button type="button" onClick={() => navigate(-1)} className="absolute top-4 left-4 bg-nav-blue text-white shadow font-bold py-2 px-4 rounded-full transition ease-in-out hover:bg-mid-blue duration-300">
          ˂ Back
        </button>
        <div className={`flex items-center justify-center bg-white m-auto rounded-2xl shadow-2xl`}>
          <div className="flex flex-col justify-between items-center p-6">
            <div className="flex text-3xl font-bold text-slate-600 mb-4">
              User Login
            </div>
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
                <div className="flex items-center justify-left">
                  <label className='inline-flex'>
                    <input
                      type="checkbox"
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                      id="CheckRememberMe"
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                  </label>
                  <div className="ml-2 text-xs font-medium text-gray-400">
                    Remember Me
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <button type="submit" className="bg-sub-blue text-white shadow font-bold py-2 rounded-lg transition ease-in-out hover:bg-blue-900 duration-300">
                  Log In
                </button>
                <button type="button" className="bg-red-500 text-white shadow font-bold py-2 rounded-lg transition ease-in-out hover:bg-red-700 duration-300" onClick={() => navigate("/signup")}>
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {isWarning && (
        <Prompt title="Login Failed" message={failMessage} positiveText="Retry" positiveFunction={() => setIsWarning(false)} />
      )}
      {isLoading && (
        <Spinner />
      )}
    </>
  )
}