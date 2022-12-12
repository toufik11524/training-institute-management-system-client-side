import React from 'react';
import trainerStyle from './trainer.module.css';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Trainer = (props) => {
    const {_id, name, email, trainerImage } = props.trainer;

    return (
        <div className={trainerStyle.trainer}>
            <Card style={{ backgroundColor: 'lightyellow', border: '2px solid black', height: '350px', width: '300px'  }}>
                <Card.Img style={{ height: '200px', width: '200px', marginLeft: "40px"}} variant="top" src={`http://localhost:4000/` + trainerImage} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{email}</Card.Text>
                </Card.Body>
                <div className={trainerStyle.trainer__button}>
                    <Button onClick={()=> props.removeTrainer(props.trainer)} variant="danger">Delete</Button>
                    <Link style={{ paddingLeft: '10px' }} to={`/dashboard/updateTrainer/${_id}`}>
                        <Button variant="primary">Update</Button>
                    </Link>
                    <Link style={{ paddingLeft: '10px' }} to={`/dashboard/viewTrainer/${_id}`}>
                        <Button variant="success">View</Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default Trainer;