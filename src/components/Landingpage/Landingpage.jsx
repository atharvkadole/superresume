import React from 'react';
import HeroSection from './HeroSection';
import ContinuousThumbnailCarousel from './ContinuousThumbnailCarousel';
import OneClickDeploySection from './OneClickDeploySection';
import Navbar from '../Navbar/Navbar';

const Landingpage = () => {
    return (
        <div className=''>
            <Navbar />
            <HeroSection />
            <ContinuousThumbnailCarousel />
            <OneClickDeploySection />
        </div>
    );
};

export default Landingpage;
