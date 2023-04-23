import "./App.css";
import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
import NoPage from "./pages/NoPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import UnprotectedRoute from "./components/UnprotectedRoute";
import Shop from "./pages/Shop";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const View = lazy(() => import("./pages/View"));
const RoadmapCreatePage = lazy(() => import("./pages/RoadmapCreatePage"));
const Home = lazy(() => import("./pages/Home"));
const Feed = lazy(() => import("./pages/Feed"));
const Setting = lazy(() => import("./pages/Setting"));
const Profile = lazy(() => import("./pages/Profile"));
const Introduction = lazy(() => import("./pages/Introduction"));
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
                <UnprotectedRoute>
                  <Suspense fallback={<Spinner />}>
                    <Signup />
                  </Suspense>
                </UnprotectedRoute>
              }
            ></Route>
            <Route
              path="/login"
              element={
                <UnprotectedRoute>
                  <Suspense fallback={<Spinner />}>
                    <Login />
                  </Suspense>
                </UnprotectedRoute>
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
                  <Introduction wantPremium={true} />
                </Suspense>
              }
            ></Route>
            <Route path="/" element={<Navbar />}>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<Spinner />}>
                      <Home key="my-home" />
                    </Suspense>
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="home/:other_uid"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<Spinner />}>
                      <Home key="other-home" />
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
                key="other-home"
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
              /><Route
                path="shop"
                element={
                  <ProtectedRoute>
                    <Suspense fallback={<Spinner />}>
                      <Shop />{" "}
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
