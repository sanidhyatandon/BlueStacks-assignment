import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Photos from '../containers/Photos';
const routes = (
  <Switch>
    <Route exact={true} path="/" component={Photos} />
  </Switch>
);

export default routes;
