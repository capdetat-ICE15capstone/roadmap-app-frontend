import "./App.css";
import Navbar from "./components/Navbar";
import Feed from "./pages/Feed";
import Spinner from './components/Spinner'
import NoPage from "./pages/NoPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const RoadmapCreatePage = lazy(() => import("./pages/RoadmapCreatePage"));
const Setting = lazy(() => import("./pages/Setting"));
const Profile = lazy(() => import("./pages/Profile"));
const Calendar = lazy(() => import("./pages/Calendar"));
const FeedPage = lazy(() => import("./pages/Feed"));
const Home = lazy(() => import("./pages/Home"))

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route
              path="createRoadMap"
              element={
                <Suspense fallback={<Spinner />}>
                  <RoadmapCreatePage />
                </Suspense>
              }
            ></Route>
            <Route
              path="signup"
              element={
                <Suspense fallback={<Spinner />}>
                  <Signup />
                </Suspense>
              }
            ></Route>
            <Route
              path="login"
              element={
                <Suspense fallback={<Spinner />}>
                  <Login />
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
            <Route
              path="calendar"
              element={
                <Suspense fallback={<Spinner />}>
                  <Calendar />{" "}
                </Suspense>
              }
            />
            <Route
              path="feed"
              element={
                <Suspense fallback={<Spinner />}>
                  <FeedPage />{" "}
                </Suspense>
              }
            />
            <Route
              path="home"
              element={
                <Suspense fallback={<Spinner />}>
                  <Home />{" "}
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
