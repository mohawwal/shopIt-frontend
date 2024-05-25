import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './pages/navbar/navbar';
import Header from './pages/navbar/header';
import Home from './pages/home/home'


function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <Header/>
          <Navbar/>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
