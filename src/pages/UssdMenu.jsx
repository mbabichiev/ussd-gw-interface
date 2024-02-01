import React, { useState, useEffect } from 'react';
import ShortCodesList from '../components/ShortCodesList';
import Loader from '../components/UI/Loader/Loader';

const UssdMenu = () => {

    const [shortCodes, setShortCodes] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

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
            <ShortCodesList shortCodesList={shortCodes}/>
        </div>
    );
};

export default UssdMenu;