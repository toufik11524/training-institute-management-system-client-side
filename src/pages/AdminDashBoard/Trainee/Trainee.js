import React from 'react';
import traineeStyle from './trainee.module.css';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Trainee = (props) => {
    const {_id, name, email, traineeImage } = props.trainee;

    return (
        <div className={traineeStyle.trainee}>
            <Card style={{ backgroundColor: 'lightyellow', border: '2px solid black', height: '350px', width: '300px'  }}>
                <Card.Img style={{ height: '200px', width: '200px', marginLeft: "40px"}} variant="top" src={`http://localhost:4000/` + traineeImage} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{email}</Card.Text>
                </Card.Body>
                <div className={traineeStyle.trainee__button}>
                    <Button onClick={()=> props.removeTrainee(props.trainee)} variant="danger">Delete</Button>
                    <Link style={{ paddingLeft: '10px' }} to={`/dashboard/updateTrainee/${_id}`}>
                        <Button variant="primary">Update</Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default Trainee;