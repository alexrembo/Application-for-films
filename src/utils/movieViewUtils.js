export const sortMovie = (visibleSort, arr) => {
	//sort all the films in their title (all films with a big letter)
  const sortAZ = (a, b) => {
    if (a.Title > b.Title) return 1;
    if (a.Title < b.Title) return -1;
  }
  const sortZA = (a, b) => {
    if (a.Title < b.Title) return 1;
    if (a.Title > b.Title) return -1;
  }
	return (visibleSort) ? arr.sort(sortZA) : arr.sort(sortAZ);
}

export const searchMovie = (visibleSearchMovie, visibleSearchActor, movies) => {
  //If there is a search for the name of the movie, then 
  //it turns on the first condition, if for the actors, the second
  let arr = (visibleSearchMovie) ? movies.filter( item => { 
    //form a new array with the films on the basis of whether the entered 
    //value is a substring of the name of the movie (or the substring of the name of the actor)
      return ~item.Title.indexOf(visibleSearchMovie) 
    }) : 
    (visibleSearchActor) ? movies.filter( item => { 
      if (item.Stars) {
        const actor = item.Stars.filter( item => {
          return ~item.indexOf(visibleSearchActor)
      })
      return actor.length > 0
    } 
  }) : 
  arr = movies;
  return arr;
}