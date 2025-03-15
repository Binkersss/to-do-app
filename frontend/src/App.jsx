import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

import './App.css'

function App() {


  return (
    <div>
      <Router>
        <header>
          <h1>To Do List</h1>
          <p>Track your tasks</p>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>

        <footer>
          <p>2025 Nathaniel Chappelle</p>
        </footer>
      </Router>
    </div>
  );
}

export default App;
