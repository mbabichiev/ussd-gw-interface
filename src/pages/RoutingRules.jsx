import React, { useState, useEffect } from 'react';
import RoutingRulesList from '../components/RoutingRulesList';
import Loader from '../components/UI/Loader/Loader';

const RoutingRules = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [rules, setRules] = useState([]);

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
        <RoutingRulesList rules={rules}/>
    );
};

export default RoutingRules;