import React from 'react';
import Header from '../../components/Header/Header';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import Auth from '@/components/Auth/Auth';

interface ILayout {
  children: React.ReactNode;
}

const Layout = (props: ILayout) => {
  return (
    <Auth>
      <Header />
      <main className="mt-14 md:ml-20 md:mt-0 xl:ml-60">{props.children}</main>
      <NavigationBar />
    </Auth>
  );
};

export default Layout;
