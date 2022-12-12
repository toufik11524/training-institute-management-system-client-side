import React from 'react';
import batchStyle from '../batch.module.css';

const Batch = (props) => {
    const { name, duration, status, startDate, endDate } = props.batch;

    return (
        <div className={batchStyle.batch}>
            <h4>{name}</h4>
            <h4>{duration}</h4>
            <h4>Status: {status}</h4>
            <h5>Start: {startDate}</h5>
            <h5>End: {endDate}</h5>
        </div>
    );
};

export default Batch;