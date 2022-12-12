import React from 'react';
import navStyle from './Nav.module.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { clearTheUser, getUser } from '../../utils/localStorage';
import { Button } from 'react-bootstrap';

const Nav = (props) => {
    const user = getUser();
    const navigate = useNavigate();

    const logOut = () => {
        // console.log('logout hitted');
        clearTheUser();
        navigate('/');
    }

    return (
        <div className={navStyle.nav}>
            <NavLink 
                className={navStyle.nav__link} 
                to='/'
                style={({ isActive }) => 
                      (isActive ? {backgroundColor: 'greenyellow'} : {backgroundColor: 'aqua'})}
            >Courses</NavLink>

            {
                user?.email &&
                <NavLink 
                    className={navStyle.nav__link} 
                    to='/dashboard'
                    style={({ isActive }) => 
                        (isActive ? {backgroundColor: 'greenyellow'} : {backgroundColor: 'aqua'})}
                >Dashboard</NavLink>
            }

            <NavLink 
                className={navStyle.nav__link} 
                to='/trainingHistory'
                style={({ isActive }) => 
                      (isActive ? {backgroundColor: 'greenyellow'} : {backgroundColor: 'aqua'})}
            >Training History</NavLink>

            <NavLink 
                className={navStyle.nav__link} 
                to='/contact'
                style={({ isActive }) => 
                      (isActive ? {backgroundColor: 'greenyellow'} : {backgroundColor: 'aqua'})}
            >Contact</NavLink>

            <NavLink 
                className={navStyle.nav__link} 
                to='/about'
                style={({ isActive }) => 
                      (isActive ? {backgroundColor: 'greenyellow'} : {backgroundColor: 'aqua'})}
            >About</NavLink>

            {
                user?.email ? 
                <div style={{ marginTop: '4px' }} >
                    <span style={{ fontWeight: 'bold', fontSize: '20px', color: 'green' }}>{user.name} </span>
                    <Button style={{ marginBottom: '5px' }} variant="danger" onClick={() => logOut()}>LogOut</Button>
                </div>
                :
                <NavLink 
                    className={navStyle.nav__link} 
                    to='/signIn'
                    style={({ isActive }) => 
                        (isActive ? {backgroundColor: 'greenyellow'} : {backgroundColor: 'aqua'})}
                >SignIn</NavLink>
            }
        </div>
    );
};

export default Nav;