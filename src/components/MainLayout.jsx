import React from 'react';
import Header from './common/Header';
import Footer from './common/Footer';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="mt-14">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;