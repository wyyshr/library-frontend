import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from './views/home/Home';
import Login from './views/login/Login';
import ScanCode from './views/scanCode/ScanCode';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={ScanCode}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/home" component={Home}></Route>
      </Router>
    </div>
  );
}

export default App;
