import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './views/login/Login';
import ScanCode from './views/scanCode/ScanCode';

function App() {
  return (
    <div className="App">
      <Router>
        <Route path="/" exact component={Login}></Route>
        <Route path="/scanCode" component={ScanCode}></Route>
      </Router>
    </div>
  );
}

export default App;
