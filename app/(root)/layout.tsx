import React from 'react';
import Header from '../../components/Header/Header';
import NavigationBar from '../../components/NavigationBar/NavigationBar';
import NewPostModal from '@/components/NewPostModal/NewPostModal';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import { IUser } from '@/types/common';
import './global.css';

interface ILayout {
  children: React.ReactNode;
}

const Layout = async (props: ILayout) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const user = session.user as IUser;

  return (
    <>
      <Header />
      <main className="mt-14 md:ml-20 md:mt-0 xl:ml-60 h-full">{props.children}</main>
      <NavigationBar currentUser={user} />
      <NewPostModal />
      <div id="portal-root"></div>
    </>
  );
};

export default Layout;
