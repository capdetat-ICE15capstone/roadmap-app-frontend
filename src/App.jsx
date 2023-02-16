import "./App.css";
import Navbar from "./components/Navbar";
import Feed from "./pages/Feed";
// import Login from "./pages/Login";
// import RoadmapCreatePage from "./pages/RoadmapCreatePage";
// import Setting from "./pages/Setting";
// import Profile from "./pages/Profile";
// import Calendar from "./pages/Calendar";
import NoPage from "./pages/NoPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./pages/Login"));
const RoadmapCreatePage = lazy(() => import("./pages/RoadmapCreatePage"));
const Setting = lazy(() => import("./pages/Setting"));
const Profile = lazy(() => import("./pages/Profile"));
const Calendar = lazy(() => import("./pages/Calendar"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Feed />} />
            <Route
              path="createRoadMap"
              element={
                <Suspense fallback={<h1>Loading</h1>}>
                  <RoadmapCreatePage />
                </Suspense>
              }
            />
            <Route
              path="login"
              element={
                <Suspense fallback={<h1>Loading</h1>}>
                  <Login />
                </Suspense>
              }
            ></Route>
            <Route
              path="setting"
              element={
                <Suspense fallback={<h1>Loading</h1>}>
                  <Setting />{" "}
                </Suspense>
              }
            ></Route>
            <Route
              path="profile"
              element={
                <Suspense fallback={<h1>Loading</h1>}>
                  <Profile />{" "}
                </Suspense>
              }
            />
            <Route
              path="calendar"
              element={
                <Suspense fallback={<h1>Loading</h1>}>
                  <Calendar />{" "}
                </Suspense>
              }
            />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
