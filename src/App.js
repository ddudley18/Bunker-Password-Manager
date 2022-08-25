import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">Hi</Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
