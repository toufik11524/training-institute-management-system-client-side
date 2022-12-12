import React from 'react';
import Button from 'react-bootstrap/Button'
import './SingleCourse.css';

const Topic = (props) => {
    const {_id, name} = props.topic;
    return (
        <div className='course__container'>
            <div className='course__container__name'>
                <h4>{name}</h4>
            </div>
            <div className='course__container__delete'>
                <Button onClick={()=> props.removeFromCourse(_id)} variant="danger">X</Button>
            </div>
        </div>
    );
};

export default Topic;