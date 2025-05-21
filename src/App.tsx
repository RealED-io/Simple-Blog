// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import { LoginForm } from './components/LoginForm.tsx';
import { SignupForm } from './components/SignupForm.tsx';
import { LogoutButton } from './components/LogoutButton.tsx';
import { supabase } from './supabaseClient.ts';
import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        alert(error.message);
      } else {
        setSession(data.session);
      }
    };
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      authListener.subscription.unsubscribe();
    };

  }, []);

  console.log(session);

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
