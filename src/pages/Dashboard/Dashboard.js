import React from 'react';
import { Outlet } from 'react-router-dom';
import Content from '../Content/Content';

const Dashboard = () => {
    return (
        <>
            <Content>
                <Outlet />
            </Content>
        </>
    );
};

export default Dashboard;