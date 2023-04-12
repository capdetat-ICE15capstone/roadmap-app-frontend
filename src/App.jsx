import "./App.css";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import NoPage from "./pages/NoPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import HomeOtherUser from "./pages/HomeOtherUser";
import { isUserLoggedIn } from "./functions/userFunction";

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
const Premium = lazy(() => import("./pages/Premium"));
const Activity = lazy(() => import("./pages/Activity"));
const SearchPage = lazy(() => import("./pages/SearchPage"));

const ProtectedRoute = ({children}) => {
  if (!isUserLoggedIn()) {
    return <Navigate to="/intro" replace />;
  }

  return children;
};

const UnProtectedRoute = ({children}) => {
  if (isUserLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
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
                  <Premium />
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
                  <Suspense fallback={<Spinner />}>
                    <Activity />{" "}
                  </Suspense>
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
