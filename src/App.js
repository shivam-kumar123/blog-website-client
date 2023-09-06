import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import JoinUser from './components/JoinUser';
import BlogList from './components/BlogList';
import './App.css';

function App() {

  const [isAuthenticated, SetIsAuthenticated] = useState(false);

  return (
    <Routes className='App'>
      <Route 
        exact path="/" 
        element={<JoinUser
          isAuthenticated={isAuthenticated}
          SetIsAuthenticated={SetIsAuthenticated}
      />} />
      {
        isAuthenticated ? (
        <Route path="/blogs" element={<BlogList />} /> 
        ) : (
        <Route path="/blogs" element={<Navigate to="/" />} />
      )}
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
