import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import TaskPage from './TaskPage'
import RequireAuth from './RequireAuth'
import useAuth from './hooks/useAuth'

function App() {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <>
      {
        auth.isLoggedIn('Google') ?
          <>
            <a href="" onClick={() => auth.LogOut('Google')}> Log Out </a>
            <br/>
          </> :
          <>
            <a href="http://localhost:4000/googleauth/sign-in"> Sign In via Google Auth </a> 
            <br/>
          </>
      }
      <a href="/"> home </a>
      <br/>
      <a href="/task-list"> Task List </a>
      <Routes>
        <Route index element={<h1> home </h1>}/>
        <Route path="/task-list" element={<TaskPage/>}/>
        <Route element={<RequireAuth/>}>
          <Route index element={<h1> RequireAuth Index </h1>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
