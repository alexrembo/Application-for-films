import React, { Component } from 'react'
import { connect } from 'react-redux'
import Movie from '../components/Movie'

export class MoviePage extends Component {
  render() {
    const { page } = this.props
    //the resulting URL we modify under usual name of the film and
    //Dispatched by the component which is responsible for rendering movies
    const titleMovie = this.props.params.movies.replace(/-/g,' ');
    return <div>
      <Movie movies={page.movies} titleMovie={titleMovie} />
    </div>
  }
}

function mapStateToProps (state) {
  return {
    page: state.page
  }
}

export default connect(mapStateToProps)(MoviePage)
