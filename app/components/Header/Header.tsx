import React from 'react';
import Logo from '../Logo/Logo';

const Header = () => {
  return (
    <div className="fixed top-0 border-b border-gray-200 flex items-center h-14 w-full bg-white px-4 md:hidden">
      <Logo iconClassName='hidden' />
    </div>
  );
};

export default Header;
