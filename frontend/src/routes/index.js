import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Categories from '~/pages/Categories';
import Profile from '~/pages/Profile';
import TodoForm from '~/pages/TodoForm';
import CategoryForm from '~/pages/CategoryForm';
import ReminderForm from '~/pages/ReminderForm';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />

      <Route path="/dashboard" isPrivate component={Dashboard} />
      <Route path="/categories" exact isPrivate component={Categories} />
      <Route path="/profile" isPrivate component={Profile} />

      <Route path="/todos/create" isPrivate component={TodoForm} />
      <Route path="/categories/create" isPrivate component={CategoryForm} />
      <Route path="/reminder/create" isPrivate component={ReminderForm} />
    </Switch>
  );
}
