import "./App.css";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import NoPage from "./pages/NoPage";
import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import { lazy, Suspense, useState, useEffect } from "react";
import HomeOtherUser from "./pages/HomeOtherUser";
import { isServerResponding, isUserLoggedIn } from "./functions/userFunction";
import { axiosInstance } from "./functions/axiosInstance";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const View = lazy(() => import("./pages/View"));
const RoadmapCreatePage = lazy(() => import("./pages/RoadmapCreatePage"));
const Home = lazy(() => import("./pages/Home"));
const FriendHome = lazy(() => import("./pages/HomeOtherUser"));
const Feed = lazy(() => import("./pages/Feed"));
const Setting = lazy(() => import("./pages/Setting"));
const Profile = lazy(() => import("./pages/Profile"));
const Introduction = lazy(() => import("./pages/Introduction"));
const Activity = lazy(() => import("./pages/Activity"));
const SearchPage = lazy(() => import("./pages/SearchPage"));

function ProtectedRoute({ children }) {
  const route = '/user/'
  const [authStatus, setAuthStatus] = useState(null);

  console.log(children);
  axiosInstance.get(route)
    .then(response => {
      console.log(response);
      setAuthStatus(true);
    })
    .catch(error => {
      console.error(error);
      setAuthStatus(false);
    })

  if (authStatus == null) {
    return <Spinner />;
  } else if (authStatus === true) {
    return children;
  } else {
    return <Navigate replace to="/intro" />;
  }
}

function UnProtectedRoute({ children }) {
  const route = '/user/'
  const [authStatus, setAuthStatus] = useState(null);

  console.log(children);
  axiosInstance.get(route)
    .then(response => {
      console.log(response);
      setAuthStatus(true);
    })
    .catch(error => {
      console.error(error);
      setAuthStatus(false);
    })

  if (authStatus == null) {
    return <Spinner />;
  } else if (authStatus === true) {
    return <Navigate replace to="/" />;
  } else {
    return children;
  }
}

function App() {
  /*
  let [fetched, setFetched] = useState(false);
  let [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect (() => {
    const fetchData = async () => {
      setIsLoggedIn(await isUserLoggedIn());
      setFetched(true);
    }
    fetchData();
  }, [location.pathname]);

  const ProtectedRoute = ({children}) => {
    if (!isLoggedIn) {
      return <Navigate to="/intro" replace />;
    }

    return children;
  }

  const UnProtectedRoute = ({children}) => {
    if (isLoggedIn) {
      return <Navigate to="/" replace />;
    }

    return children;
  }

  if (!fetched) return <Spinner />;

  console.log(window.location.pathname);
  console.log(isLoggedIn);
  */

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              path="/signup"
              element={
                <UnProtectedRoute>
                  <Suspense fallback={<Spinner />}>
                    <Signup />
                  </Suspense>
                </UnProtectedRoute>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <UnProtectedRoute>
                  <Suspense fallback={<Spinner />}>
                    <Login />
                  </Suspense>
                </UnProtectedRoute>
              }
            ></Route>
            <Route
              path="/intro"
              element={
                <Suspense fallback={<Spinner />}>
                  <Introduction />
                </Suspense>
              }
            ></Route>
            <Route
              path="/premium"
              element={
                <Suspense fallback={<Spinner />}>
                  <Introduction wantPremium={true}/>
                </Suspense>
              }
            ></Route>
            <Route path="/" element={<Navbar />}>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<Spinner />}>
                      <Home />
                    </Suspense>
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="friend_home"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<Spinner />}>
                      <FriendHome />             
                    </Suspense>
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="view/:roadmap_id"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<Spinner />}>
                      <View />
                    </Suspense>
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="create"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<Spinner />}>
                      <RoadmapCreatePage mode="create" />
                    </Suspense>
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="feed"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<Spinner />}>
                      <Feed />
                    </Suspense>
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="search"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<Spinner />}>
                      <SearchPage />
                    </Suspense>
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="edit/:id"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<Spinner />}>
                      <RoadmapCreatePage mode="edit" />
                    </Suspense>
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="clone/:id"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<Spinner />}>
                      <RoadmapCreatePage mode="clone" />
                    </Suspense>
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="view/:id"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<Spinner />}>
                      <View />
                    </Suspense>
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="setting"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<Spinner />}>
                      <Setting />{" "}
                    </Suspense>
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<Spinner />}>
                      <Profile />{" "}
                    </Suspense>
                  </ProtectedRoute>
                }
              /><Route
                path="activity"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<Spinner />}>
                      <Activity />{" "}
                    </Suspense>
                  </ProtectedRoute>
                }
              />
              <Route path="/404" element={<NoPage />} />
              <Route path="*" element={
                <ProtectedRoute>
                  <Navigate replace to="/" />
                </ProtectedRoute>
              } />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
