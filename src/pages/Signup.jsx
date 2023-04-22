import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../functions/axiosInstance';
import { motion } from 'framer-motion';

import Prompt from '../components/Prompt';
import SpinnerNeo from '../components/SpinnerNeo';

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
  const [isReading, setIsReading] = useState(false);

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
      <div className={`relative flex flex-row h-screen w-screen bg-white overflow-y-auto py-8`}>
        <button type="button" onClick={() => navigate(-1)} className="absolute top-4 left-4 bg-black text-white shadow font-bold py-2 px-4 rounded-full transition ease-in-out hover:bg-mid-blue duration-300">
          Back
        </button>
        <motion.div
          className="flex items-center justify-center bg-white m-auto rounded-2xl shadow-2xl border border-gray-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            type: "easeInOut",
            duration: "0.3"
          }}
        >
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
                  <button onClick={() => setIsReading(true)} className="ml-1 text-xs hover:text-red-300 transition-color duration-300 font-bold text-gray-400">
                    Terms and Conditions for MileMap
                  </button>
                </label>
                <button type="submit" className="bg-red-500 text-white shadow font-bold py-2 grow rounded-3xl transition ease-in-out hover:bg-red-700 duration-300">
                  Sign Up
                </button>
              </div>
            </form>
            <div className="flex justify-center mt-4">
              <button type="button" className="text-xs font-light text-gray-400" onClick={() => navigate("/login", { state: { firstLogin: true } })}>
                Already have an account?
              </button>
            </div>
          </div>
        </motion.div>
      </div>
      <Prompt visible={isWarning} title="Signup Failed" message={failMessage} positiveText="Try again" positiveFunction={() => setIsWarning(false)} />
      <Prompt
        visible={isReading}
        title="Terms and Conditions for MileMap"
        positiveText="Agree"
        positiveFunction={() => setIsReading(false)}
        message={
          <div className='space-y-2 text-sm text-left overflow-y-auto h-[200px]'>
            <h2 className='text-lg font-bold'>Introduction</h2>
            <p>These Website Standard Terms and Conditions written on this webpage shall manage your use of our website, MileMap accessible at MileMap.com.</p>
            <p>These Terms will be applied fully and affect to your use of this Website. By using this Website, you agreed to accept all terms and conditions written in here. You must not use this Website if you disagree with any of these Website Standard Terms and Conditions. These Terms and Conditions have been generated with the help of the <a href="https://www.termsfeed.com/blog/sample-terms-and-conditions-template/">Terms And Conditions Sample Template</a>.</p>
            <p>Minors or people below 18 years old are not allowed to use this Website.</p>
            <h2 className='text-lg font-bold'>Intellectual Property Rights</h2>
            <p>Other than the content you own, under these Terms, MileMap and/or its licensors own all the intellectual property rights and materials contained in this Website.</p>
            <p>You are granted limited license only for purposes of viewing the material contained on this Website.</p>
            <h2 className='text-lg font-bold'>Restrictions</h2>
            <p>You are specifically restricted from all of the following:</p>
            <ul>
              <li>publishing any Website material in any other media;</li>
              <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
              <li>publicly performing and/or showing any Website material;</li>
              <li>using this Website in any way that is or may be damaging to this Website;</li>
              <li>using this Website in any way that impacts user access to this Website;</li>
              <li>using this Website contrary to applicable laws and regulations, or in any way may cause harm to the Website, or to any person or business entity;</li>
              <li>engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website;</li>
              <li>using this Website to engage in any advertising or marketing.</li>
            </ul>
            <p>Certain areas of this Website are restricted from being access by you and MileMap may further restrict access by you to any areas of this Website, at any time, in absolute discretion. Any user ID and password you may have for this Website are confidential and you must maintain confidentiality as well.</p>
            <h2 className='text-lg font-bold'>Your Content</h2>
            <p>In these Website Standard Terms and Conditions, "Your Content" shall mean any audio, video text, images or other material you choose to display on this Website. By displaying Your Content, you grant MileMap a non-exclusive, worldwide irrevocable, sub licensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.</p>
            <p>Your Content must be your own and must not be invading any third-party's rights. MileMap reserves the right to remove any of Your Content from this Website at any time without notice.</p>
            <h2 className='text-lg font-bold'>No warranties</h2>
            <p>This Website is provided "as is," with all faults, and MileMap express no representations or warranties, of any kind related to this Website or the materials contained on this Website. Also, nothing contained on this Website shall be interpreted as advising you.</p>
            <h2 className='text-lg font-bold'>Limitation of liability</h2>
            <p>In no event shall MileMap, nor any of its officers, directors and employees, shall be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.  MileMap, including its officers, directors and employees shall not be held liable for any indirect, consequential or special liability arising out of or in any way related to your use of this Website.</p>
            <h2 className='text-lg font-bold'>Indemnification</h2>
            <p>You hereby indemnify to the fullest extent MileMap from and against any and/or all liabilities, costs, demands, causes of action, damages and expenses arising in any way related to your breach of any of the provisions of these Terms.</p>
            <h2 className='text-lg font-bold'>Severability</h2>
            <p>If any provision of these Terms is found to be invalid under any applicable law, such provisions shall be deleted without affecting the remaining provisions herein.</p>
            <h2 className='text-lg font-bold'>Variation of Terms</h2>
            <p>MileMap is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis.</p>
            <h2 className='text-lg font-bold'>Assignment</h2>
            <p>The MileMap is allowed to assign, transfer, and subcontract its rights and/or obligations under these Terms without any notification. However, you are not allowed to assign, transfer, or subcontract any of your rights and/or obligations under these Terms.</p>
            <h2 className='text-lg font-bold'>Entire Agreement</h2>
            <p>These Terms constitute the entire agreement between MileMap and you in relation to your use of this Website, and supersede all prior agreements and understandings.</p>
            <h2 className='text-lg font-bold'>Governing Law & Jurisdiction</h2>
            <p>These Terms will be governed by and interpreted in accordance with the laws of the State of th, and you submit to the non-exclusive jurisdiction of the state and federal courts located in th for the resolution of any disputes.</p>
          </div>
        }
      />
      <SpinnerNeo visible={isLoading} />
    </>
  )
}