import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import PostDetailPage from './pages/PostDetailPage/PostDetailPage';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/r/:subreddit" element={<HomePage />} /> {/* new route */}
        <Route path="/post/:id" element={<PostDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
