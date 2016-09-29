import $ from 'jquery'
import { API_URL, FILE_URL, IMG_URL } from '../constants/constants'
export let movies;

const sendRequest = (path, obj) => {
 $.ajax(API_URL + path, {
  type: 'POST',
  data: JSON.stringify(obj),
  contentType: 'application/json',
  success: () => { console.log('success');},
  error  : () => { console.log('error');}
  })
}

$.ajax({
  type: 'GET',
  url: FILE_URL,
  async: false,
  dataType: 'json',
  success: data => {
    movies = data.movies;
  }
});

export const loadFile = (movies, input) => { 
  const reader = new FileReader();
  reader.onload = () => {
    const text = reader.result;
    for (let i = 0; i < text.match(/[^\n]+/gi).length / 4; i++) {  
      const Title = text.match(/[^\n]+/gi)[i * 4].match(/[^:]+/gi).filter( item =>  item != 'Title' ).join(': ').replace(/(^\s+|\s+$)/g,'');
      const ReleaseYear = (text.match(/[^\n]+/gi)[i * 4 + 1].match(/[^:]+/gi).filter( item =>  item != 'Release Year' ) + '').replace(/(^\s+|\s+$)/g,'');
      const Format = (text.match(/[^\n]+/gi)[i * 4 + 2].match(/[^:]+/gi).filter( item =>  item != 'Format' ) + '').replace(/(^\s+|\s+$)/g,'');
      const Img = IMG_URL;
      const starsString = text.match(/[^\n]+/gi)[i * 4 + 3].match(/[^:]+/gi).filter( item =>  item != 'Stars' ) + '';
      const Stars = starsString.match(/[^,]+/gi).map( item => item.replace(/(^\s+|\s+$)/g,''));
      const obj = {
        Title,
        ReleaseYear,
        Format,
        Stars,
        Img
      };
      movies.push(obj);
    } 
  }; 
  reader.readAsText(input.files[0]);
}

export const saveFile = movies => { 
  const path = '/movie/add/file';
  sendRequest(path, movies);
}

export const addMovie = movies => { 
  //reads all parameters from the form 
  //making string, which will be split into separate variables
  const path = '/movie/add';
  const msg = $('#formAdd').serialize(); 
  const str = msg.replace( /\+/g, ' ').match(/[^&]+/gi);
  const Title = decodeURIComponent((str[0] + '').match(/[^=]+/gi)[1] + '');
  const ReleaseYear = (str[1] + '').match(/[^=]+/gi)[1] + '';
  const Format = decodeURIComponent((str[2] + '').match(/[^=]+/gi)[1] + '');
  const Stars = ((str[3] + '').match(/[^=]+/gi)[1] + '').replace(/%2C+/gi, ',').match(/[^,]+/g).map( item => {
    return decodeURIComponent(item);
  });
  const Img = (str[4]) ? ((str[4] + '').match(/[^=]+/gi)[1] + '')  : IMG_URL;
  //new movie with the variables record to object, which sent to the server
  const obj = {
    Title,
    ReleaseYear,
    Format,
    Stars,
    Img
  };
  // Check whether there is a film in the database, if there is something we did not add it
  const value = movies.every( item => { 
    return item.Title != Title
  })
  if (value) {
    movies.push(obj);
    sendRequest(path, obj);
  } else console.log('Фильм уже есть!');
  $('#formAdd')[0].reset();
  return movies;
};

//parameters obtained from the form, is converted to a string
//the line is broken so as to obtain the name of the movie
export const deleteMovie = movies => {
  const path = '/movie/delete';
  const msg = $('#formDelete').serialize(); 
  const Title = decodeURIComponent(msg.replace( /\+/g, ' ').match(/[^=]+/gi)[1] + '');
  console.log(Title);
  const obj = {
    Title
  };
  //mail our object to server, 
  //and at the specified URL, we'll be there to catch him
  let arr = movies.filter( item => {
    return item.Title != Title
  });
  sendRequest(path, obj);
  $('#formDelete')[0].reset();
  return arr;
};
