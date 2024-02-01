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
                    <li>
                        <Link to="/" class="nav-link fw-bold py-1 px-2 justify-content-center d-flex align-items-center">
                            <svg class="bi me-1 align-self-center" width="1.3em" height="1.3em" fill="currentColor" style={{ verticalAlign: 'middle' }}>
                                <use href="#home"></use>
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/links" class="nav-link fw-bold py-1 px-2 link-secondary d-flex align-items-center">
                            <svg class="bi me-1 align-self-center" width="1.3em" height="1.3em" fill="currentColor" style={{ verticalAlign: 'middle' }}>
                                <use href="#links"></use>
                            </svg>
                            Links
                        </Link>
                    </li>
                    <li>
                        <Link to="/ussd-menu" class="nav-link fw-bold py-1 px-2 link-secondary d-flex align-items-center">
                            <svg class="bi me-1 align-self-center" width="1.3em" height="1.3em" fill="currentColor" style={{ verticalAlign: 'middle' }}>
                                <use href="#menu"></use>
                            </svg>
                            USSD menu
                        </Link>
                    </li>
                    <li>
                        <Link to="/settings" class="nav-link fw-bold py-1 px-2 link-secondary d-flex align-items-center">
                            <svg class="bi me-1 align-self-center" width="1.3em" height="1.3em" fill="currentColor" style={{ verticalAlign: 'middle' }}>
                                <use href="#gear-fill"></use>
                            </svg>
                            Settings
                        </Link>
                    </li>
                </ul>

                <div class="col-md-3 text-end">
                    <button type="button" class="btn btn-primary">Logout</button>
                </div>
            </header>
        </div>
    );
};

export default Navbar;