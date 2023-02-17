import React from 'react'

import { ReactComponent as Logo } from "../assets/logo-big.svg"

const Signup = () => {
  return (
    <>
      <div className="m-auto">
        <div className="flex bg-white rounded shadow-lg max-w-3xl">
          <div className="flex flex-col m-6">
            <p className="text-center mb-2 text-3xl font-bold text-slate-600">
              Create Account
            </p>
            <form>
              <div className="flex flex-col space-y-2 mb-4">
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
                    />
                  </label>
                  <label>
                    <p className="text-gray-600 text-xs mb-1">
                      Confirm Password
                    </p>
                    <input
                      type="passwordConfirm"
                      className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="InputPasswordConfirm"
                      placeholder="********"
                    />
                  </label>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <label>
                  <input
                    type="checkbox"
                    className="w-4 h-4S bg-gray-100 border-gray-300 rounded"
                    id="CheckAgree"
                  />
                  <a className="ml-2 text-xs font-medium text-gray-400">
                    I have agreed to
                  </a>
                  <a href="#" className="ml-2 text-xs font-bold text-gray-400">
                    ayayayayayaya
                  </a>
                </label>
                <button type="submit" className="bg-blue-900 text-white shadow font-bold py-2 grow rounded-3xl focus:outline-none focus:shadow-outline">
                  Sign Up
                </button>
              </div>

            </form>
            <div className="flex justify-center m-4">
              <p className="text-xs font-light text-gray-400">
                --------- OR sign up with ---------
              </p>
            </div>
            <div className="flex justify-between mb-2 mx-8 space-x-2">
              <div className="flex flex-auto">
                <button className="bg-transparent grow text-gray-600 border border-grey-500 py-2 font-semilight rounded-3xl text-sm" type="button">
                  Google
                </button>
              </div>
              <div className="flex flex-auto">
                <button className="bg-transparent grow text-gray-600 border border-grey-500 py-2 font-semilight rounded-3xl text-sm" type="button">
                  Facebook
                </button>
              </div>
              <div className="flex flex-auto">
                <button className="bg-transparent grow text-gray-600 border border-grey-500 py-2 font-semilight rounded-3xl text-sm" type="button">
                  Email
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col bg-gradient-to-b from-teal-300 to-amber-100 rounded">
            <div className="flex flex-col grow justify-center my-4 mx-12">
              <Logo className="justify-center self-center" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


export default Signup