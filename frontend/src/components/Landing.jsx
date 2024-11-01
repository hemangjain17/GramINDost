import React from 'react';
import './Landing.css';
import Navbar from './Navbar';
const Landing = () => {
  return (
    <>
    <div className='landing-box'>
        <Navbar />
        <div className="landing-container"> 
            <h1 className='sapplinns'>Sapplinns</h1>
            <h3 className='sapplinns-subhead'>
              Empowering Farmers with Precision Technology and Insightful Solutions.<br />
              <span>Grow smarter, greener, and more resilient with Sapplinns.</span>
            </h3>
        </div>
    </div>
    </>
  );
};

export default Landing;
