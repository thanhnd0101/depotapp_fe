import React from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router, Route, Switch
} from "react-router-dom";
import './App.css';
import Dam from './modules/Dam';
import Histories from './modules/Histories';
import Login from './modules/Login';
import Marketplace from './modules/Marketplace';
import Order from './modules/Order';
import Profile from './modules/Profile';
import PrivateRoute from './routes/privateRoute';

function App() {
  const isAuthenticated = useSelector((state: any) => state.user.token).length > 0;
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login></Login>
        </Route>
        <PrivateRoute exact path="/dam" isAuthenticated={isAuthenticated}>
          <Dam />
        </PrivateRoute>
        <PrivateRoute exact path="/marketplace" isAuthenticated={isAuthenticated}>
          <Marketplace />
        </PrivateRoute>
        <PrivateRoute exact path="/orders" isAuthenticated={isAuthenticated}>
          <Order />
        </PrivateRoute>
        <PrivateRoute exact path="/histories" isAuthenticated={isAuthenticated}>
          <Histories />
        </PrivateRoute>
        <PrivateRoute exact path="/profile" isAuthenticated={isAuthenticated}>
          <Profile/>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
