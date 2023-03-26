import "./App.css";
import Navbar from "./components/Navbar";
import Feed from "./pages/Feed";
import Spinner from "./components/Spinner";
import NoPage from "./pages/NoPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

import { useState } from "react";
import Login from "./pages/Login";
import useToken from "./components/useToken";

// const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const RoadmapCreatePage = lazy(() => import("./pages/RoadmapCreatePage"));
const Setting = lazy(() => import("./pages/Setting"));
const Profile = lazy(() => import("./pages/Profile"));
const Introduction = lazy(() => import("./pages/Introduction"));
const Premium = lazy(() => import("./pages/Premium"));

function App() {

  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
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
            <Route index element={<Feed />} />
            <Route
              path="create"
              element={
                <Suspense fallback={<Spinner />}>
                  <RoadmapCreatePage mode="create" />
                </Suspense>
              }
            ></Route>
            <Route
              path="explore"
              element={
                <Suspense fallback={<Spinner />}>
                  <Feed />
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
                  {/* insert view roadmap element */}
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
            />
            <Route path="/404" element={<NoPage />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
