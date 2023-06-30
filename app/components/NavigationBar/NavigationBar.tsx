import React from 'react';
import HomeLink from '../HomeLink/HomeLink';
import ExploreLink from '../ExploreLink/ExploreLink';
import NewPostLink from '../NewPostLink/NewPostLink';
import InboxLink from '../InboxLink/InboxLink';
import Logo from '../Logo/Logo';

const NavigationBar = () => {
  return (
    <nav className="fixed bg-white h-12 w-full flex justify-evenly bottom-0 border-t border-gray-200 items-center md:flex-col md:h-screen md:w-20 md:border-r md:justify-normal md:space-y-2 xl:w-60 xl:items-start xl:px-3">
      <Logo
        className="hidden md:flex h-24 items-center"
        iconClassName="xl:hidden"
        titleClassName="hidden xl:block"
      />
      <HomeLink />
      <ExploreLink />
      <NewPostLink />
      <InboxLink />
    </nav>
  );
};

export default NavigationBar;
