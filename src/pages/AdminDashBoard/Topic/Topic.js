import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Topic.css';

const Topic = (props) => {
    const { _id, name, duration } = props.topic;

    return (
        <div className="topic">
            <h4>{name}</h4>
            <h5>Duration: {duration}</h5>
            <div className="topic__button">
                    <Button onClick={()=> props.removeTopic(_id)} variant="danger">Delete</Button>
                    <Link className='topic__button__update' to={`/dashboard/updateTopic/${_id}`}>
                        <Button variant="primary">Update</Button>
                    </Link>
            </div>
        </div>
    );
};

export default Topic;