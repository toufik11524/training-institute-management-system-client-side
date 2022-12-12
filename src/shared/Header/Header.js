import React from 'react';
import Nav from '../Nav/Nav';
import './Header.css';

const Header = () => {
    return (
        <>
            <div className='header'>
                <h1>Nexus IT Academy</h1>
            </div>
            <Nav />
        </>
    );
};

export default Header;