import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { BlogPost } from './pages/BlogPosts';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
// import { Profile } from './pages/Profile';
// import  Profile  from './pages/Profile';

function App() {
  return (
    <div>
      <Home />
    </div>
  );
}

export default App;