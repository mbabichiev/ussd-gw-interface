import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from '../pages/Home';
import Links from '../pages/Links';

const AppRouter = () => {
    return (
        <div>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route exact path='/links' element={<Links />} />
            </Routes>
        </div>
    );
};
export default AppRouter;