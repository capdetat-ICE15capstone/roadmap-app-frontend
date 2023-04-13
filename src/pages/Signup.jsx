import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../functions/axiosInstance';

import Prompt from '../components/Prompt';
import Spinner from '../components/Spinner';

export default function Signup() {
  const navigate = useNavigate();

  const specialChars = /^[a-zA-Z0-9]+(?:[_-][a-zA-Z0-9]+)*$/;
  const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [agreement, setAgreement] = useState(false);

  const [validEmail, setValidEmail] = useState(false);
  const [validFirstName, setValidFirstName] = useState(false);
  const [validLastName, setValidLastName] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [validPasswordConfirm, setValidPasswordConfirm] = useState(false);

  const [isWarning, setIsWarning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [failMessage, setFailMessage] = useState();

  // const location = useLocation();
  // const isFirst = location.state?.state || false;

  function handleSignupSubmit(event) {
    event.preventDefault();
    if (validEmail && validFirstName && validLastName && validPassword && validPasswordConfirm && validUsername && agreement) {
      const submission = {
        "email": email,
        "username": username,
        "password": password,
        "first_name": firstName,
        "last_name": lastName
      }
      submitForm(submission);
    }
  }

  // "First name, Last name, and Username must not contain special characters."
  // "First name and Last name must not exceed 255 characters."
  // "Username must not exceed 24 characters."
  // "Email address must not contain special characters"
  // "Password must be longer than 8 charaters and not exceed 24 characters"
  // "Password must match"

  useEffect(() => {
    if (!emailValidation.test(email)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  }, [email])

  useEffect(() => {
    if (!specialChars.test(firstName) || firstName.length > 255 || firstName.length === 0) {
      setValidFirstName(false);
    } else {
      setValidFirstName(true);
    }
  }, [firstName])

  useEffect(() => {
    if (!specialChars.test(lastName) || lastName.length > 255 || lastName.length === 0) {
      setValidLastName(false);
    } else {
      setValidLastName(true);
    }
  }, [lastName])

  useEffect(() => {
    if (!specialChars.test(username) || username.length > 24 || username.length === 0) {
      setValidUsername(false);
    } else {
      setValidUsername(true);
    }
  }, [username])

  useEffect(() => {
    if (password.length < 8 || password.length > 24) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
  }, [password])

  useEffect(() => {
    if (password !== passwordConfirm) {
      setValidPasswordConfirm(false);
    } else {
      setValidPasswordConfirm(true);
    }
  }, [passwordConfirm])


  async function submitForm(form) {
    setIsLoading(true);
    const route = `/user/register/`;
    axiosInstance.post(route, form)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        navigate("/", { "state": { "firstLogin": true } });
      })
      .catch((error) => {
        console.error(error.response.data.detail);
        setFailMessage(error.response.data.detail);
        setIsLoading(false);
        setIsWarning(true);
      });
  }

  // bg-gradient-to-b from-teal-300 to-amber-100

  return (
    <>
      <div className={`flex flex-row h-screen w-screen bg-gradient-to-b from-sub-blue to-main-blue overflow-y-auto py-8`}>
        <div className="flex items-center justify-center bg-white m-auto rounded-2xl shadow-2xl">
          <div className="flex flex-col justify-center m-8">
            <p className="text-center mb-4 text-3xl font-bold text-slate-600">
              Create Account
            </p>
            <form id="register-form" autoComplete="off" onSubmit={handleSignupSubmit}>
              <div className="flex flex-col space-y-1 mb-4">
                <div className="flex flex-col">
                  <label className='focus:outline-none focus:shadow-outline'>
                    <div className="text-gray-600 text-xs">
                      Email Address
                    </div>
                    <input
                      type="email"
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-sm text-gray-700 leading-tight"
                      id="InputEmail"
                      placeholder="Email Address"
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                    />
                    <div className={`${(validEmail) ? 'invisible' : 'visible'} text-red-500 text-xs mb-1`}>
                      invalid email
                    </div>
                  </label>
                </div>
                <div className="flex flex-row justify-between space-x-4">
                  <label className='w-1/2 focus:outline-none focus:shadow-outline'>
                    <div className="text-gray-600 text-xs">
                      First Name
                    </div>
                    <input
                      type="firstname"
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-sm text-gray-700 leading-tight"
                      id="InputFirstName"
                      placeholder="First Name"
                      onChange={(event) =>
                        setFirstName(event.target.value)
                      }
                    />
                    <div className={`${(validFirstName) ? 'invisible' : 'visible'} text-red-500 text-xs mb-1`}>
                      invalid first name
                    </div>
                  </label>
                  <label className='w-1/2  focus:outline-none focus:shadow-outline'>
                    <div className="text-gray-600 text-xs">
                      Last Name
                    </div>
                    <input
                      type="lastname"
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-sm text-gray-700 leading-tight"
                      id="InputLastName"
                      placeholder="Last Name"
                      onChange={(event) =>
                        setLastName(event.target.value)
                      }
                    />
                    <div className={`${(validLastName) ? 'invisible' : 'visible'} text-red-500 text-xs mb-1`}>
                      invalid last name
                    </div>
                  </label>
                </div>
                <div className="flex flex-col">
                  <label>
                    <div className="text-gray-600 text-xs focus:outline-none focus:shadow-outline">
                      Username
                    </div>
                    <input
                      type="username"
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-sm text-gray-700 leading-tight"
                      id="InputUsername"
                      placeholder="Username"
                      onChange={(event) =>
                        setUsername(event.target.value)
                      }
                    />
                    <div className={`${(validUsername) ? 'invisible' : 'visible'} text-red-500 text-xs mb-1`}>
                      invalid username
                    </div>
                  </label>
                </div>
                <div className="flex flex-row justify-between space-x-4">
                  <label className='w-1/2 focus:outline-none focus:shadow-outline'>
                    <div className="text-gray-600 text-xs">
                      Password
                    </div>
                    <input
                      type="password"
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-sm text-gray-700 leading-tight"
                      id="InputPassword"
                      placeholder="********"
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                    />
                    <div className={`${(validPassword) ? 'invisible' : 'visible'} text-red-500 text-xs mb-1`}>
                      invalid password
                    </div>
                  </label>
                  <label className='w-1/2 focus:outline-none focus:shadow-outline'>
                    <div className="text-gray-600 text-xs">
                      Confirm Password
                    </div>
                    <input
                      type="password"
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-sm text-gray-700 leading-tight"
                      id="InputPasswordConfirm"
                      placeholder="********"
                      onChange={(event) =>
                        setPasswordConfirm(event.target.value)
                      }
                    />
                    <div className={`${(validPasswordConfirm) ? 'invisible' : 'visible'} text-red-500 text-xs mb-1`}>
                      password mismatch
                    </div>
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
                    ...
                  </a>
                </label>
                <button type="submit" className="bg-red-500 text-white shadow font-bold py-2 grow rounded-3xl transition ease-in-out hover:bg-red-700 duration-300">
                  Sign Up
                </button>
              </div>
            </form>
            <div className="flex justify-center mt-4">
              <button type="button" className="text-xs font-light text-gray-400" onClick={() => navigate("/login", { state: { firstLogin: true } })}>
                Alrady have an account?
              </button>
            </div>
          </div>
        </div>
      </div>
      {isWarning && (
        <Prompt title="Signup Failed" message={failMessage} positiveText="Try again" positiveFunction={() => setIsWarning(false)} />
      )}
      {isLoading && (
        <Spinner />
      )}
    </>
  )
}