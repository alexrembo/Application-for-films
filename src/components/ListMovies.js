import React, { PropTypes, Component } from 'react'
import { Link } from 'react-router'
import { addMovie, deleteMovie, saveFile, loadFile } from '../utils/api'
import { searchMovie, sortMovie } from '../utils/movieViewUtils'
import OperatingPanel from './childListMovies/OperatingPanel'
import AddForm from './childListMovies/AddForm'
import DelForm from './childListMovies/DelForm'

export default class ListMovies extends Component {
  constructor (props) {
    super(props)
    const { movies } = this.props;
    this.state = {
      visible: false,
      visibleAddForm: false,
      visibleDelForm: false,
      enableSort: false,
      enableSearchMovie: '',
      enableSearchActor: '',
      movies: movies
    };
  }
  showAddForm () {
    const { visibleAddForm } = this.state
    this.setState({visibleAddForm: !visibleAddForm})
  }
  showDeleteForm () {
    const { visibleDelForm } = this.state
    this.setState({visibleDelForm: !visibleDelForm})
  }
  add () {
    const { movies } = this.state;
    this.setState({movies: addMovie(movies)});
  }
  delete () {
    const { movies } = this.state;
    this.setState({movies: deleteMovie(movies)})
  }
  searchMovie (e) {
    this.setState({enableSearchMovie: e.target.value})
  }
  searchActor (e) {
    this.setState({enableSearchActor: e.target.value})
  }
  sort () {
    const { enableSort } = this.state;
    this.setState({enableSort: !enableSort})
  }
  saveFile () {
    const { movies } = this.state;
    this.setState({visible: true})
    saveFile(movies);
  }
  loadFile (event) {
    const { movies } = this.state;
    const input = event.target;
    loadFile(movies, input)
    this.setState({movies: movies });
  }
  info() {
    const { visibleAddForm, visibleDelForm, enableSort, enableSearchMovie, enableSearchActor, movies } = this.state
    //the first step is a check
    //If the user was doing a search (by title or actor), it will return an array of films, 
    //whose names correspond to the value at which there is a search, if not, it returns an array of films untouched
    const arr = searchMovie(enableSearchMovie, enableSearchActor, movies);
    //the next stage, sorting starts by pressing the corresponding function
    const arrSort = sortMovie(enableSort, arr);
    const info = arrSort.map( (item, index) => {  
      //make references to our movies
      const urlTitle = item.Title.replace(/ /g,'-')
      return <div className='col-xs-10 col-xs-offset-2 col-sm-5 col-sm-offset-1 col-md-3 col-md-offset-1 movie' key={index}>
        <p><Link to={`/movies/${urlTitle}`}><img src={item.Img} alt={item.Title}></img></Link></p>
        <div className={' ' + index}><Link to={`/movies/${urlTitle}`}>{item.Title}({item.ReleaseYear})</Link></div>
      </div>
    }) 
    return <div>
      <div className='row'>
        <OperatingPanel showAddForm={::this.showAddForm} showDeleteForm={::this.showDeleteForm} searchMovie={::this.searchMovie} 
        searchActor={::this.searchActor} loadFile={::this.loadFile} sort={::this.sort} saveFile={::this.saveFile}/>
        <AddForm visibleAddForm={visibleAddForm} add={::this.add} />
        <DelForm visibleDelForm={visibleDelForm} del={::this.delete} />
      </div>
      <div className='row'>
        {info}
      </div>
    </div>
  }
  render() {
    return <div>
      {this.info()}
    </div>
  }
}

ListMovies.PropTypes = {
  movies: PropTypes.array.isRequired
}