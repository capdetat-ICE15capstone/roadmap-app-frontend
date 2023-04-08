import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [agreement, setAgreement] = useState(false);

  const [clickEmail, setClickEmail] = useState(false);
  const [clickFirstName, setClickFirstName] = useState(false);
  const [clickLastName, setClickLastName] = useState(false);
  const [clickUsername, setClickUsername] = useState(false);
  const [clickPassword, setClickPassword] = useState(false);
  const [clickPasswordConfirm, setClickPasswordConfirm] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === "" || firstName === "" || lastName === "" || username === "" || password === "" || passwordConfirm === "") {
      console.log("all form must be filled");
      return;
    }
    if (validateEmail() !== "") {
      console.log(validateEmail());
      return;
    }
    if (validateFirstName() !== "") {
      console.log(validateFirstName());
      return;
    }
    if (validateLastName() !== "") {
      console.log(validateLastName());
      return;
    }
    if (validateUsername() !== "") {
      console.log(validateUsername());
      return;
    }
    if (validatePassword() !== "") {
      console.log(validatePassword());
      return;
    }
    if (validatePasswordConfirm() !== "") {
      console.log(validatePasswordConfirm());
      return;
    }
  }

  function validateEmail () {
    if (!email.includes("@")) return "invalid email"
    return ""
  }

  function validateFirstName() {
    if (specialChars.test(firstName)) return "First name must not contain special characters."
    if (firstName.length > 255) return "First name must not exceed 255 characters."
    return ""
  }

  function validateLastName() {
    if (specialChars.test(lastName)) return "Last name must not contain special characters."
    if (lastName.length > 255) return "Last name must not exceed 255 characters."
    return ""
  }

  function validateUsername() {
    if (specialChars.test(username)) return "Username must not contain special characters."
    if (username.length > 24) return "Username must not exceed 24 characters."
    // if (username is taken) return "Username is taken"
    return ""
  }

  function validatePassword() {
    if (password.length < 8 || password.length > 24) return "Password must be between 8 and 24 characters"
    return ""
  }

  function validatePasswordConfirm() {
    if (password !== passwordConfirm) return "Confirm password must match password"
    return ""
  }

  return (
    <>
      <div className={`flex flex-row h-screen w-screen`}>
        <div className="flex justify-center w-1/2 bg-gradient-to-b from-cyan-500 to-blue-500">
          <div className="flex flex-col justify-center m-8">

          </div>
        </div>
        <div className="flex justify-center w-1/2">
          <div className="flex flex-col justify-center m-8">
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
                      onClick={(event) =>
                        setClickEmail(true)
                      }
                    />
                    {validateEmail() !== "" && clickEmail ? <p className="text-red-500 text-xs mb-1">{validateEmail()}</p> : ""}
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
                      onClick={(event) =>
                        setClickFirstName(true)
                      }
                    />
                    {validateFirstName() !== "" && clickFirstName ? <p className="text-red-500 text-xs mb-1">{validateFirstName()}</p> : ""}
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
                      onClick={(event) =>
                        setClickLastName(true)
                      }
                    />
                    {validateLastName() !== "" && clickLastName ? <p className="text-red-500 text-xs mb-1">{validateLastName()}</p> : ""}
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
                      onClick={(event) =>
                        setClickUsername(true)
                      }
                    />
                    {validateUsername() !== "" && clickUsername ? <p className="text-red-500 text-xs mb-1">{validateUsername()}</p> : ""}
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
                      onClick={(event) =>
                        setClickPassword(true)
                      }
                    />
                    {validatePassword() !== "" && clickPassword ? <p className="text-red-500 text-xs mb-1">{validatePassword()}</p> : ""}
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
                      onClick={(event) =>
                        setClickPasswordConfirm(true)
                      }
                    />
                    {validatePasswordConfirm() !== "" && clickPasswordConfirm ? <p className="text-red-500 text-xs mb-1">{validatePasswordConfirm()}</p> : ""}
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
              <button type="button" className="text-xs font-light text-gray-400" onClick={() => navigate("/login", { state: { firstLogin: true } })}>
                Alrady have an account?
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}