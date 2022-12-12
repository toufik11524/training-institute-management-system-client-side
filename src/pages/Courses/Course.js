import React from 'react';
import CourseStyle from './courses.module.css';
import { Card } from 'react-bootstrap';

const Course = (props) => {
    const {name, category, detail, courseImage } = props.course;

    return (
        <div className={CourseStyle.post}>
            <Card style={{ backgroundColor: 'lightyellow', border: '2px solid black'  }}>
                <Card.Img style={{ height: '300px', width: '100%'}} variant="top" src={`http://localhost:4000/` + courseImage} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>{category}</Card.Text>
                    <Card.Text>{detail}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Course;