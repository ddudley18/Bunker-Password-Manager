import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Welcome from './pages/Welcome';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Welcome/>}></Route>
          <Route exact path="/register" element={<Register/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
