import React from 'react';
import TopNavBar from './TopNavBar';

const Layout = ({ children }) => {
  return (
    <div className="min-vh-100 bg-light">
      <TopNavBar />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
