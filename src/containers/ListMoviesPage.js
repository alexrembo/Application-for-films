import React, { Component } from 'react'
import { connect } from 'react-redux'
import ListMovies from '../components/ListMovies'

export class ListMoviesPage extends Component {
  render() {
    const { page } = this.props
    return <div>
      <ListMovies movies={page.movies} />
    </div>
  }
}

function mapStateToProps (state) {
  return {
    page: state.page
  }
}

export default connect(mapStateToProps)(ListMoviesPage)
