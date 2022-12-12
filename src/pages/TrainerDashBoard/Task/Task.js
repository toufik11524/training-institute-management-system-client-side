import React from 'react';
import CourseStyle from './task.module.css';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Task = (props) => {
    const {_id, name, taskImage } = props.task;

    return (
        <div className={CourseStyle.course}>
            <Card style={{ backgroundColor: 'lightyellow', border: '2px solid black', height: '350px', width: '300px'  }}>
                <Card.Img style={{ height: '200px', width: '200px', marginLeft: "40px"}} variant="top" src={`http://localhost:4000/` + taskImage} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                </Card.Body>
                <div className={CourseStyle.course__button}>
                    <Link style={{ paddingLeft: '10px' }} to={`/dashboard/viewTask/${_id}`}>
                        <Button variant="success">View</Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default Task;