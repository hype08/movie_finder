import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { setSelectedMenu, getMoviesGenre, setHeader } from '../../actions';
import NotFound from '../NotFound';
import MoviesList from './MoviesList';
import SortBy from './SortBy';

// Genres Component
// Gets general object from State, Match from Router, Action Creators to set Selected menu and Movies from Store
const Genre = ({
  general,
  match,
  setSelectedMenu,
  getMoviesGenre,
  setHeader,
  movies,
  location,
}) => {
  const [sort, setsort] = useState('popularity.desc');
  const { genres, selected, base } = general;
  const params = queryString.parse(location.search);

  // Call hook to set the sidebar selected menu if valid
  useSetSelected(match.params.name, setSelectedMenu, genres, setHeader);

  // Call hook to fetch movies of the genre
  useFetchMoviesGenre(match.params.name, getMoviesGenre, params, sort);

  // If there is no selected on state, means url used was not valid, return 404
  if (!selected) {
    return <NotFound />;
  }

  //If there are no movies, still fetching, loading
  if (!movies.results) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <SortBy changeSort={setsort} />
      <MoviesList />
    </div>
  );
};

// Hook to fetch the movies, will be called everytime the route or the filters from the state change
function useFetchMoviesGenre(name, cb, params, sort) {
  useEffect(() => {
    cb(name, params.page, sort);
  }, [name, params.page, sort]);
}

// Hook to set the selected menu on the sidebar, if url is valid and genre exists on the state
function useSetSelected(name, cb, genres, setHeader) {
  useEffect(() => {
    if (genres.find(el => el.name === name)) {
      cb(name);
      setHeader(name);
    }
    return () => {
      cb('');
      setHeader('');
    };
  }, [name]);
}

// Map State to Component Props
const mapStateToProps = ({ general, movies }) => {
  return { general, movies };
};

export default connect(
  mapStateToProps,
  { setSelectedMenu, getMoviesGenre, setHeader }
)(Genre);
