import React from 'react';
import { css } from '@emotion/react';
import { CircleLoader } from 'react-spinners';

const override = css`
  display: block;
  margin: 0 auto;
`;

const LoadSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <CircleLoader css={override} size={100} color={'hsla(0, 77%, 51%, 1)'} />
      </div>
    </div>
  );
};

export default LoadSpinner;
