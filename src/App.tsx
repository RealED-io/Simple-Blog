// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import { LoginForm } from './components/LoginForm.tsx';
import { SignupForm } from './components/SignupForm.tsx';
import { LogoutButton } from './components/LogoutButton.tsx';

function App() {

  return (
    <div>
      <h1>Hello World</h1>
      <LoginForm />
      <SignupForm />
      <LogoutButton />
    </div>
  );
}

export default App;
