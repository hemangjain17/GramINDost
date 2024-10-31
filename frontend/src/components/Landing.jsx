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
        </div>
    </div>
    </>
  );
};

export default Landing;
