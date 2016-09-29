import React, { PropTypes, Component } from 'react'

export default class Movie extends Component {
  info() {
    const { movies, titleMovie } = this.props
    //according to our URL there is a search for all the films, to find the right
    const arrMovie = movies.filter( item => item.Title === titleMovie)
    const info = arrMovie.map( (item, index) => {
      const stars = (item.Stars) ? item.Stars.map( (item, index) => {
        return <div className='row' key={index}>
          <div className={'col-xs-6 col-md-6 col-md-offset-8' + index}>{item}</div>
        </div>
      }) : '';
      return <div className='posterMovie' key={index}>
        <div className='col-xs-6 col-md-3 col-md-offset-3 + index'>
          <div className='nameMovie'>{item.Title}({item.ReleaseYear})</div>        
          <p><img src={item.Img} alt={item.Title}></img></p>
        </div>
        <div className='col-xs-6 col-md-5 infoMovie'>
          <div className='col-xs-6 col-md-2'>
            <div>Id</div>
            <div>Year</div>
            <div>Format</div>
            <div>Stars</div>
          </div>
          <div className='col-xs-6 col-md-7 col-md-offset-3'>
            <div>{Math.round((index + Math.random()) * 10000)}</div>
            <div>{item.ReleaseYear}</div>
            <div>{item.Format}</div>
            {stars}
          </div>  
        </div>
      </div>
    })
    return <div className='row'>
      {info}
    </div>
  }
  render() {
    return <div>
      {this.info()}   
    </div>
  }
}

Movie.PropTypes = {
  movies: PropTypes.array.isRequired
}

