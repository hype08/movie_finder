import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Header from '../components/Header';
import styled from 'styled-components';

import { setSelectedMenu, getMoviesDiscover, clearMovies } from '../actions';
import MoviesList from '../components/MoviesList';
import Loader from '../components/Loader';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

// Discover Component
const Discover = ({
  general,
  match,
  location,
  setSelectedMenu,
  getMoviesDiscover,
  clearMovies,
  movies,
}) => {
  const params = queryString.parse(location.search);
  const { secure_base_url } = general.base.images;

  // When mounts go up
  useEffect(() => {
    window.scrollTo({
      top: (0, 0),
      behavior: 'smooth',
    });
  }, []);

  // Send url to setSelected Action Creator, it will check if is valid
  useEffect(() => {
    window.scrollTo({
      top: (0, 0),
      behavior: 'smooth',
    });
    setSelectedMenu(match.params.name);
    // Clean up to remove selected menu from state
    return () => setSelectedMenu();
  }, [match.params.name]);

  // Call hook to fetch movies discover, pass in the url query
  useFetchMoviesDiscover(
    match.params.name,
    getMoviesDiscover,
    params,
    clearMovies
  );

  // If loading
  if (movies.loading) {
    return <Loader />;
  }

  // Else return movies list
  return (
    <Wrapper>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{`${general.selected} Movies`}</title>
      </Helmet>
      <Header title={general.selected} subtitle="movies" />
      <MoviesList movies={movies} baseUrl={secure_base_url} />
    </Wrapper>
  );
};

// Hook to fetch the movies, will be called everytime the route or the filters from the state change
function useFetchMoviesDiscover(name, getMoviesDiscover, params, clearMovies) {
  const query = name.replace(/\s+/g, '_').toLowerCase();
  useEffect(() => {
    window.scrollTo({
      top: (0, 0),
      behavior: 'smooth',
    });
    getMoviesDiscover(query, params.page);
    return () => clearMovies();
  }, [query, params.page]);
}

// Map State to Component Props
const mapStateToProps = ({ general, movies }) => {
  return { general, movies };
};

export default connect(
  mapStateToProps,
  { setSelectedMenu, getMoviesDiscover, clearMovies }
)(Discover);
