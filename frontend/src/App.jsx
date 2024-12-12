import React from 'react';
import Tools from './components/Tools';
import Landing from './components/Landing';
import FAQ from './components/FAQ';
import AboutUs from './components/about';
import Footer from './components/footer';
function App() {
  return (
    <>
      <div id="home">
        <Landing />
      </div>
      <div id="about">
        <AboutUs />
      </div>
      <div id="features">
        <Tools />
      </div>
      <div id="contact">
        <FAQ />
        <Footer />
      </div>
    </>
  );
}

export default App;
