import React from 'react';
import HomeLink from '../HomeLink/HomeLink';
import ExploreLink from '../ExploreLink/ExploreLink';
import NewPostLink from '../NewPostLink/NewPostLink';
import InboxLink from '../InboxLink/InboxLink';
import Logo from '../Logo/Logo';
import ProfileLink from '../ProfileLink/ProfileLink';
import Popover from '../Popover/Popover';
import LogoutButton from '../LogoutButton/LogoutButton';
import Menu from '../Menu/Menu';
import { IUser } from '@/types/common';

interface INavigationBar {
  currentUser: IUser;
}

const NavigationBar = (props: INavigationBar) => {
  return (
    <nav className="fixed z-20 bg-white h-[52px] w-full flex justify-evenly bottom-0 border-t border-gray-200 items-center md:flex-col md:h-screen md:w-20 md:border-r md:justify-normal xl:w-60 xl:items-start xl:px-3">
      <Logo
        className="hidden md:flex h-24 items-center xl:pl-3 mb-2"
        iconClassName="xl:hidden"
        titleClassName="hidden xl:block"
      />
      <HomeLink />
      <ExploreLink />
      <NewPostLink />
      <InboxLink />
      <ProfileLink currentUser={props.currentUser} />
      <Popover
        content={<LogoutButton />}
        displayCondition="click"
        menuClasses="w-40 bottom-2/4 left-full"
        className="hidden md:block mt-auto mb-5"
      >
        <Menu />
      </Popover>
    </nav>
  );
};

export default NavigationBar;
