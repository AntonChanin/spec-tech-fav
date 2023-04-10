import { Route, Routes } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ResetPage from './pages/ResetPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/reset" element={<ResetPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
