import React from 'react';
import Logo from '@/components/Logo/Logo';
import { ILayout } from '@/types/common';
import Phones from '@/components/Phones/Phones';

const Layout = ({ children }: ILayout) => {
  return (
    <div className="min-h-screen flex items-center justify-center lg:space-x-8">
      <Phones />
      <div className="flex flex-col items-center pt-4 pb-10 md:w-96 md:border md:border-gray-300 md:mx-auto lg:mx-0">
        <Logo
          className="mt-12 mb-3"
          iconClassName="hidden"
          titleClassName="w-44 h-16"
        />
        {children}
      </div>
    </div>
  );
};

export default Layout;
