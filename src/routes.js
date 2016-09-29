import React from 'react'
import App from './containers/App'
import ListMoviesPage from './containers/ListMoviesPage'
import MoviePage from './containers/MoviePage'
import NotFound from './components/NotFound'
import { IndexRedirect, Route } from 'react-router'

export const routes = (
  <div>
  <Route path='/' component={App}>
  <IndexRedirect to='movies' />
  <Route path='movies' component={ListMoviesPage} />
  <Route path='/movies/:movies' component={MoviePage} />
  </Route>
  <Route path='*' component={NotFound} />
  </div>
)