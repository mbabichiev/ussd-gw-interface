import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import Links from '../pages/Links';
import UssdMenu from '../pages/UssdMenu';

const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/links' element={<Links />} />
                <Route exact path='/ussd-menu' element={<UssdMenu />} />
            </Routes>
        </div>
    );
};
export default AppRouter;