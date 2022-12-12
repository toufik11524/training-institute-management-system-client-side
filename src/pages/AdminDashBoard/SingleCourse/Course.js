import React from 'react';
import batchStyle from './course.module.css';

const Course = (props) => {
    const { name } = props.course;
    return (
        <div className={batchStyle.batch}>
            <h4>{name}</h4>
        </div>
    );
};

export default Course;