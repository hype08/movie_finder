import React from 'react';
import styled from 'styled-components';

const LoaderWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: var(--color-primary-dark);
  box-shadow: -10rem 0rem 0rem var(--color-primary);
  border-radius: 50%;
  -webkit-animation: circle_classic 1s ease-in-out infinite alternate;
  -moz-animation: circle_classic 1s ease-in-out infinite alternate;
  animation: circle_classic 1s ease-in-out infinite alternate;

  @-webkit-keyframes circle_classic {
    0% {
      opacity: 0.1;
      -webkit-transform: rotate(0deg) scale(0.5);
    }
    100% {
      opacity: 1;
      -webkit-transform: rotate(360deg) scale(1.2);
    }
  }
  @-moz-keyframes circle_classic {
    0% {
      opacity: 0.1;
      -moz-transform: rotate(0deg) scale(0.5);
    }
    100% {
      opacity: 1;
      -moz-transform: rotate(360deg) scale(1.2);
    }
  }
  @keyframes circle_classic {
    0% {
      opacity: 0.1;
      transform: rotate(0deg) scale(0.5);
    }
    100% {
      opacity: 1;
      transform: rotate(360deg) scale(1.2);
    }
  }
`;

const Loader = () => {
  return <LoaderWrapper />;
};

export default Loader;
