import React from 'react';
import { Routes as Switch, Route } from 'react-router-dom';
import Main from '@/pages/main';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Main />} />
    </Switch>
  );
};

export default Routes;
