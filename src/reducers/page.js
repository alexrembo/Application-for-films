import { movies } from '../utils/api'

const initialState = {
  movies: movies
}

export default function page(state = initialState) {
  return state
}