import './App.css'
import Navbar from './components/Navbar'
import Feed from './pages/Feed'
import Login from './pages/Login'
import RoadmapCreatePage from './pages/RoadmapCreatePage'
import Setting from './pages/Setting'
import Profile from './pages/Profile'
import Calendar from './pages/Calendar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar/>}>
            <Route index element={<Feed/>}/>
            <Route path="createRoadMap" element={<RoadmapCreatePage/>}/>
            <Route path="login" element={<Login/>}></Route>
            <Route path="setting" element={<Setting/>}></Route>
            <Route path="profile" element={<Profile/>}/>
            <Route path="calendar" element={<Calendar/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
