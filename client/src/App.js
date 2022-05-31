import './App.css';
import React from 'react';
import Login from './components/Login/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import Navbar from './components/NavBar/Navbar';
import CreatePost from './components/CreatePost/CreatePost';
import { AuthProvider } from './components/auth';
import Users from './components/Users/Users';
import UserProfile from './components/UserProfile/UserProfile';
import UserCard from './components/UserCard/UserCard';
import ShowComments from './components/ShowComments/ShowComments';
import ShowMessages from './components/ShowMessages/ShowMessages';
import DoChat from './components/DoChat/DoChat';
import Following from './components/Following/Following';
import NotFound from './components/NotFound/NotFound';
import ProtectedRoutes from './ProtectedRoutes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/accounts/signup' element={<Signup />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/home' element={<Home />} />
            <Route path='/createPost' element={<CreatePost />} />
            <Route path='/users' element={<Users />} />
            <Route path='/user/editprofile' element={<UserProfile />} />
            <Route path='/user/:username' element={<UserCard />} />
            <Route path='/comment/*' element={<ShowComments />} />
            <Route path='/message/:username' element={<ShowMessages />} />
            <Route path='/do/chat/:username' element={<DoChat />} />
            <Route path='/following' element={<Following />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
