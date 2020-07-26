import { combineReducers } from 'redux';
import configReducer from './configReducer';
import moviesReducer from './moviesReducer';
import movieReducer from './movieReducer';
import personReducer from './personReducer';

export default combineReducers({
  general: configReducer,
  movies: moviesReducer,
  movie: movieReducer,
  person: personReducer,
});
