import React, { useEffect, useCallback } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import authstore from '../../store/authstore';
import storedb from '../../store/storedb';
import Loading from '../Loading/Loading';
import TemporaryDrawer from './Sidebar';
const Dashboard = () => {
    const navigate = useNavigate();
    const { version, getdata, dloading } = storedb();
    const { isAuth, loading } = authstore();

    // Redirect if not authenticated
    useEffect(() => {
        if (!loading && isAuth === false) {
            navigate('/', { replace: true });
        }
    }, [isAuth, loading, navigate]);

    // Fetch data when `version` updates
    useEffect(() => {
        getdata();
    }, [version]); // ✅ `getdata` is now stable

    // Show loading while authentication or data fetching is in progress
    if (loading || dloading) {
        return <Loading />;
    }

    return (
        <div className="w-screen h-screen bg-gray-900 p-3">
            
            <TemporaryDrawer />
        </div>
    );
};

export default Dashboard;
