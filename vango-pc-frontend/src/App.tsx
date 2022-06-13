import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from '@/routes';
import './asset/scss/app.scss';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes />
    </Router>
  );
}

export default App;
