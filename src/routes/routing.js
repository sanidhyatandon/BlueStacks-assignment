import { Route, Switch } from 'react-router-dom';
import React from 'react';
// import FoodList from '../containers/FoodList';
import Dashboard from '../containers/Dashboard';
const routes = (
  <Switch>
    <Route exact={true} path="/" component={Dashboard} />
  </Switch>
);

export default routes;
