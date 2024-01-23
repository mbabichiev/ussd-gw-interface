import React, { useState, useEffect } from 'react';
import Loader from '../components/UI/Loader/Loader';

const Home = () => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        
    }, [])

    if(isLoading === true) {
        return (
            <div class="text-center">
                <Loader/>
            </div>
        )
    }

    return (
        <div>
        </div>
    );
};

export default Home;