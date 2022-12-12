import React from 'react';
import Button from 'react-bootstrap/Button'
import './SingleTrainer.css';

const Topic = (props) => {
    const {_id, name} = props.topic;
    return (
        <div className='topic__container'>
            <div className='topic__container__name'>
                <h4>{name}</h4>
            </div>
            <div className='topic__container__delete'>
                <Button onClick={()=> props.removeFromTrainer(_id)} variant="danger">X</Button>
            </div>
        </div>
    );
};

export default Topic;