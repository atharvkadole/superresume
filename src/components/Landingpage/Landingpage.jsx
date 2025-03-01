import React from 'react';
import HeroSection from './HeroSection';
import ContinuousThumbnailCarousel from './ContinuousThumbnailCarousel';
import OneClickDeploySection from './OneClickDeploySection';
import Navbar from '../Navbar/Navbar';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authstore from '../../store/authstore';
import Footer from './Footer';

const Landingpage = () => {
    const navigate = useNavigate();
    const { isAuth } = authstore();
    useEffect(() => {
        // Move this to a more appropriate place, like a route guard
        const initAuth = async () => {
            if (isAuth) {
                navigate('/dashboard/display', { replace: true })
            }
        };
        initAuth();
    }, [isAuth, navigate]);
        
    return (
        <div className=''>
            <Navbar />
            <HeroSection />
            <ContinuousThumbnailCarousel />
            <OneClickDeploySection />
            <Footer />
        </div>
    );
};

export default Landingpage;
