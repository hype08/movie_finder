import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import history from '../history';

import { getPerson } from '../actions';

const ImgWrapper = styled.img`
  width: 200px;
  height: auto;
`;

const Cast = ({ general, match, person, getPerson }) => {
  const { base_url } = general.base.images;

  // Fetch movie id when id on url changes
  useEffect(() => {
    getPerson(match.params.id);
  }, [match.params.id]);

  // If empty, fetching
  if (Object.entries(person).length === 0) {
    return <div> Loading...</div>;
  }

  function renderBack() {
    if (history.action === 'PUSH') {
      return <button onClick={history.goBack}>Back</button>;
    }
  }

  return (
    <div>
      <h3>{person.name}</h3>
      <p>Biography: {person.biography}</p>
      <ImgWrapper src={`${base_url}/w780/${person.profile_path}`} />
      {renderBack()}
    </div>
  );
};

const mapStateToProps = ({ person, general }) => {
  return { person, general };
};

export default connect(
  mapStateToProps,
  { getPerson }
)(Cast);
