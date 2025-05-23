// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css';
import { LoginForm } from './components/LoginForm.tsx';
import { SignupForm } from './components/SignupForm.tsx';
// import { LogoutButton } from './components/LogoutButton.tsx';
import { supabase } from './supabaseClient.ts';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks.ts';
import { clearSession, setSession } from './features/user/authSlice.ts';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import { BlogList } from './components/BlogList.tsx';
import BlogForm from './components/BlogForm.tsx';
import { Container } from '@mui/material';


function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: authResponse, error } = await supabase.auth.getSession();
      if (error) {
        alert(error.message);
      }
      dispatch(setSession(authResponse));
    };
    fetchSession();
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session)
          dispatch(setSession({ session, user: session.user }));
        else
          dispatch(clearSession());
      },
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/blogs" />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/create" element={<BlogForm />} />
          <Route path="/blogs/:id/edit" element={<BlogForm />} />
          <Route path="/blogs/:id/delete" element={<BlogForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="*" element={<h1>404: Page Not Found</h1>} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
