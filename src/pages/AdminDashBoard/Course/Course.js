import React from 'react';
import CourseStyle from './course.module.css';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Course = (props) => {
    const {_id, name, category, detail, courseImage } = props.course;

    return (
        <div className={CourseStyle.course}>
            <Card style={{ backgroundColor: 'lightyellow', border: '2px solid black', height: '400px', width: '300px'  }}>
                <Card.Img style={{ height: '200px', width: '200px', marginLeft: "40px"}} variant="top" src={`http://localhost:4000/` + courseImage} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{category}</Card.Text>
                    <Card.Text>{detail}</Card.Text>
                </Card.Body>
                <div className={CourseStyle.course__button}>
                    <Button onClick={()=> props.removeCourse(_id)} variant="danger">Delete</Button>
                    <Link style={{ paddingLeft: '10px' }} to={`/dashboard/updateCourse/${_id}`}>
                        <Button variant="primary">Update</Button>
                    </Link>
                    <Link style={{ paddingLeft: '10px' }} to={`/dashboard/viewCourse/${_id}`}>
                        <Button variant="success">View</Button>
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default Course;