import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div class="my-2">
            <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div class="col-md-3 mb-2 mb-md-0">
                    <div class="link-secondary d-inline-flex fw-bold link-body-emphasis text-decoration-none">
                        USSD GW v1.0.0
                    </div>
                </div>

                <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="/" class="nav-link fw-bold py-1 px-2">Home</Link></li>
                    <li><Link to="/links" class="nav-link fw-bold py-1 px-2 link-secondary">Links</Link></li>
                    <li><Link to="/statistics" class="nav-link fw-bold py-1 px-2 link-secondary">Statistics</Link></li>
                    <li><Link to="/rules" class="nav-link fw-bold py-1 px-2 link-secondary">Routing rules</Link></li>
                    <li><Link to="/settings" class="nav-link fw-bold py-1 px-2 link-secondary">Settings</Link></li>
                </ul>

                <div class="col-md-3 text-end">
                    <button type="button" class="btn btn-primary">Logout</button>
                </div>
            </header>
        </div>
    );
};

export default Navbar;