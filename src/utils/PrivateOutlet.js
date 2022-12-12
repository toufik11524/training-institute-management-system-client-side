import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import isAdmin from './isAdmin';
import useAuth from './useAuth';

const PrivateOutlet = () => {
    const auth = useAuth();
    const admin = isAdmin();

    // console.log('áuth', auth);
    // console.log('admin', admin);

    return admin ? <Outlet /> : (auth ? <Navigate to="/" />: <Navigate to="/signin" />);
};

export default PrivateOutlet;