import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar/Navbar'
import authstore from './store/authstore'
import Loading from './components/Loading/Loading'
import Edit from './components/Dashboard/Display_prj/Edit'
import Display from './components/Dashboard/Display_prj/Display'
import storedb from './store/storedb'
import Landingpage from './components/Landingpage/Landingpage'
import Error from './Error'
import './App.css'

// Lazy load components
const Login = lazy(() => import('./components/Login/Login'))
const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'))



function App() {
  
  useEffect(() => {
    // Move this to a more appropriate place, like a route guard
    const initAuth = async () => {
      await authstore.getState().checkAuth()
    }
    initAuth()
  }, [])

  return (
    <div className='flex flex-col h-screen w-screen '>
    <Router>
      {/* <Navbar /> */}
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} >
                <Route path="edit/:id" element={<Edit />} />
                <Route path="display" element={<Display />} />
              </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </Router>
    </div>
  )
}

// Memoize the component if it doesn't need frequent updates
export default React.memo(App)