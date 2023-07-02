'use client';

import React from 'react';
import FacebookIcon from '../FacebookIcon/FacebookIcon';

const FacebookLoginButton = () => {
  return (
    <button className="py-2 px-3 bg-white text-sm font-semibold rounded-md shadow-md focus:outline-none w-52 text-left">
      <FacebookIcon />
      Sign in with Facebook
    </button>
  );
};

export default FacebookLoginButton;
