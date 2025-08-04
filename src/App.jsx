import { useContext, useState, useEffect } from 'react';
import NavBar from './components/NavBar/NavBar'
import { Routes, Route, useNavigate } from 'react-router';
import SignUpForm from './components/SignUpForm/SignUpForm'
import SignInForm from './components/SignInForm/SignInForm'
import { UserContext } from './contexts/UserContext';


const App = () => {
  const { user } = useContext(UserContext)

  return (
    <>
    <NavBar />
      <Routes>
        <Route path='/' element={<h1>Welcome to National Task Force</h1>} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
      </Routes>
    </>
  )
}

export default App