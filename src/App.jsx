import "./App.css";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import NoPage from "./pages/NoPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import HomeOtherUser from "./pages/HomeOtherUser";

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

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route
              path="/signup"
              element={
                <Suspense fallback={<Spinner />}>
                  <Signup />
                </Suspense>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <Suspense fallback={<Spinner />}>
                  <Login />
                </Suspense>
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
              <Route index element={<Home />} />
              <Route
                path=""
                element={
                  <Suspense fallback={<Spinner />}>
                    <Home />
                  </Suspense>
                }
              ></Route>
              <Route
                path="friend_home"
                element={
                  <Suspense fallback={<Spinner />}>
                    <FriendHome />             
                  </Suspense>
                }
              ></Route>
              <Route
                path="view"
                element={
                  <Suspense fallback={<Spinner />}>
                    <View />
                  </Suspense>
                }
              ></Route>
              <Route
                path="create"
                element={
                  <Suspense fallback={<Spinner />}>
                    <RoadmapCreatePage mode="create" />
                  </Suspense>
                }
              ></Route>
              <Route
                path="feed"
                element={
                  <Suspense fallback={<Spinner />}>
                    <Feed />
                  </Suspense>
                }
              ></Route>
              <Route
                path="search"
                element={
                  <Suspense fallback={<Spinner />}>
                    <SearchPage />
                  </Suspense>
                }
              ></Route>
              <Route
                path="edit/:id"
                element={
                  <Suspense fallback={<Spinner />}>
                    <RoadmapCreatePage mode="edit" />
                  </Suspense>
                }
              ></Route>
              <Route
                path="clone/:id"
                element={
                  <Suspense fallback={<Spinner />}>
                    <RoadmapCreatePage mode="clone" />
                  </Suspense>
                }
              ></Route>
              <Route
                path="view/:id"
                element={
                  <Suspense fallback={<Spinner />}>
                    <View />
                  </Suspense>
                }
              ></Route>
              <Route
                path="setting"
                element={
                  <Suspense fallback={<Spinner />}>
                    <Setting />{" "}
                  </Suspense>
                }
              ></Route>
              <Route
                path="profile"
                element={
                  <Suspense fallback={<Spinner />}>
                    <Profile />{" "}
                  </Suspense>
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
              <Route path="*" element={<Navigate replace to="/404" />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
