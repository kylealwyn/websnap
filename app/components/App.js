import React, { PropTypes } from 'react';
import Header from './Header';
import Footer from './Footer';

const App = ({ children }) => (
  <div className="app">
    <Header />

    <main>
      { children }
    </main>

    <Footer />
  </div>
);


App.propTypes = {
  children: PropTypes.object,
};

export default App;
