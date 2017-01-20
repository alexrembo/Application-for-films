import React from 'react'
import App from './containers/App'
import ListMoviesPage from './containers/ListMoviesPage'
import MoviePage from './containers/MoviePage'
import { IndexRedirect, Route } from 'react-router'

export const routes = (
  <Route path='/' component={App}>
  <IndexRedirect to='movies' />
  <Route path='movies' component={ListMoviesPage} />
  <Route path='/movies/:movies' component={MoviePage} />
  </Route>
)