import React from 'react';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu';
import Popover from '../Popover/Popover';
import LogoutButton from '../LogoutButton/LogoutButton';

const Header = () => {
  const menuContent = <div>
    
  </div>
  return (
    <div className="fixed top-0 border-b border-gray-200 flex items-center justify-between h-14 w-full bg-white px-4 md:hidden">
      <Logo iconClassName="hidden" />
      <Popover content={<LogoutButton />} displayCondition="click">
        <Menu />
      </Popover>
    </div>
  );
};

export default Header;
