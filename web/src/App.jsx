import { useState } from 'react'
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react"; 
import { Routes, Route, Navigate } from 'react-router';
import { useAuth } from '@clerk/clerk-react';
import PageLoader from './components/PageLoader';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';
import useUserSync from './hooks/useUserSync';

function App() {
  const {isLoaded, isSignedIn} = useAuth()
  useUserSync()
  if(!isLoaded) return <PageLoader/>
  return (
    <>
    <Routes>
      <Route path="/" element={!isSignedIn ? <HomePage/> : <Navigate to="/chat"/>} />
      <Route path="/chat" element={isSignedIn? <ChatPage/> : <Navigate to="/"/>} />
    </Routes>

    </>
  )
}

export default App