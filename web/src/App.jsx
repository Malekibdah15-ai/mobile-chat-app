import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/clerk-react"; 

function App() {
  return (
    <>
      <h1>Hellooo</h1>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </>
  )
}

export default App