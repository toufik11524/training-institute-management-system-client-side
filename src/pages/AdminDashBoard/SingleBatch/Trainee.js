import React from 'react';
import Button from 'react-bootstrap/Button'
import './SingleBatch.css';

const Trainee = (props) => {
    const {_id} = props.trainee;
    return (
        <div className='trainee__container'>
            <div className='trainee__container__name'>
                <h4>{props.trainee.name}</h4>
            </div>
            <div className='trainee__container__delete'>
                <Button onClick={()=> props.removeFromBatch(_id)} variant="danger">X</Button>
            </div>
        </div>
    );
};

export default Trainee;