/* jsx-a11y/no-static-element-interactions */
import React from 'react';
import './Loading.css';

const Loading = () => (
  <div className="load">
    <svg className="spinner" width="50px" height="50px" viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg">
      <circle className="path" fill="none" strokeWidth="10" strokeLinecap="round" cx="44" cy="44" r="30" />
    </svg>
  </div>
);
export default Loading;
