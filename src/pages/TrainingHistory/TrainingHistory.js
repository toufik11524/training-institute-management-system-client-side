import React from 'react';
import { Outlet } from 'react-router-dom';
import TrainingContent from './TrainingContent/TrainingContent';

const TrainingHistory = () => {
    return (
        <>
            <TrainingContent>
                <Outlet />
            </TrainingContent>
        </>
    );
};

export default TrainingHistory;