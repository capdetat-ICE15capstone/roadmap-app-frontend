import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [agreement, setAgreement] = useState(false);

  const handleSubmit = (event) => {
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
    
    const res = {
      'email': email,
      'password': password,
      'firstname': firstName,
      'lastname': lastName,
      'username': username,
    };

    console.log(res);
  };

  return (
    <>
      <div className="flex flex-col h-screen bg-gray-200">
        <div className="flex bg-white rounded shadow-lg max-w-3xl m-auto">
          <div className="flex flex-col m-8">
            <p className="text-center mb-4 text-3xl font-bold text-slate-600">
              Create Account
            </p>
            <form id="register-form" onSubmit={handleSubmit}>
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
              <button className="text-xs font-light text-gray-400" onClick={() => navigate("/login")}>
                Alrady have an account?
              </button>
            </div>
            {/* <div className="flex justify-between mb-2 mx-8 space-x-2">
              <div className="flex flex-auto">
                <button className="bg-transparent grow text-gray-600 border border-grey-500 py-2 font-semilight rounded-3xl text-sm" type="button">
                  <div className="flex justify-center items-center space-x-2">
                    <img src={google} alt="google" className="w-4 h-4"></img>
                    <span>Google</span>
                  </div>
                </button>
              </div>
              <div className="flex flex-auto">
                <button className="bg-transparent grow text-gray-600 border border-grey-500 py-2 font-semilight rounded-3xl text-sm" type="button">
                  <div className="flex justify-center items-center space-x-2">
                    <img src={facebook} alt="google" className="w-4 h-4"></img>
                    <span>Facebook</span>
                  </div>
                </button>
              </div>
              <div className="flex flex-auto">
                <button className="bg-transparent grow text-gray-600 border border-grey-500 py-2 font-semilight rounded-3xl text-sm" type="button">
                  <div className="flex justify-center items-center space-x-2">
                    <img src={email} alt="google" className="w-4 h-4"></img>
                    <span>Email</span>
                  </div>
                </button>
              </div>
            </div> */}
          </div>
          {/* <div className="flex flex-col bg-gradient-to-b from-teal-300 to-amber-100 rounded">
            <div className="flex flex-col grow justify-center my-4 mx-12">
              <Logo className="justify-center self-center" />
            </div>
          </div> */}
        </div>
      </div>
    </>
  )
}


export default Signup