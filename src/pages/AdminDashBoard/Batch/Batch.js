import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import batchStyle from './batch.module.css';

const Batch = (props) => {
    const { _id, name, duration, status } = props.batch;

    return (
        <div className={batchStyle.batch}>
            <h4>{name}</h4>
            <h4>{duration}</h4>
            <h4>Status: {status}</h4>
            <Link to={`/dashboard/viewBatch/${_id}`}>
                <Button>View Detail</Button>
            </Link>
        </div>
    );
};

export default Batch;