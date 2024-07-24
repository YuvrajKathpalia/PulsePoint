import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Registerr from './pages/Registerr';
import ArticlePage from './pages/ArticlePage';

const App = () => (
  <div>
    <Navbar />
    <main className="p-4">
      <Home />
      <Login />
      <Registerr />
      <ArticlePage />
    </main>
  </div>
);

export default App;

