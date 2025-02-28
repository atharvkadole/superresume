import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authstore from '../../store/authstore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle} from '@fortawesome/free-brands-svg-icons'
import '../../App.css'

const Login = () => {
    const { checkAuth, login, isAuth } = authstore(); 
    const navigate = useNavigate(); 
    // Redirect to Dashboard if user is authenticated
    useEffect(() => {
        if (isAuth) {
            navigate('/Dashboard/display', { replace: true });
        }
    }, [isAuth, navigate]);

    return (
        
        <div className='w-screen h-screen flex justify-center items-center bg-gray-900 scrollbar-hidden'>
            <button onClick={login} className='bg-white py-2 px-4 rounded text-black font-bold hover:bg-blue-400 focus:outline-none focus:shadow-outline text-lg'>
            <FontAwesomeIcon icon={faGoogle} className="mr-2 text-gray-900" />   Login with Google
            </button>
        </div>
    );
};

export default Login;
