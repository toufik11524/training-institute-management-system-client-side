import React, { useEffect, useState } from 'react';
import { getUser } from '../../../utils/localStorage';
import Course from './Course';
import courseStyle from './course.module.css';

const Courses = (props) => {   
    const user = getUser(); 
    const coursePerPage = 3;

    const [page, setPage] = useState(1);
    const [totalCourses, setTotalCourses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState();
    const [isDelete, setIsdelete] = useState();

    // useEffect(()=> {
    //     fetch(`http://localhost:4000/courses`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setCourses(data.results);
    //             // console.log(data.results);
    //         })
    //         .catch(
    //             (error) => {
    //               setError(error);
    //             }
    //         )
    // }, [isDelete]);

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_BASE_URL}courses?page=${page}&coursePerPage=${coursePerPage}`)
            .then(res => res.json())
            .then(data => {
                setCourses(data.results.courses);
                setTotalCourses(data.results.total);
                // console.log(data.results);
                
            })
            .catch(
                (error) => {
                  setError(error);
                }
            )
    }, [page, isDelete]);

    const removeCourse = courseId => {
        const token = 'Bearer ' + user.access_token;
        fetch(`http://localhost:4000/admin/delete-course/${courseId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            if(data.success === true){
                props.notify('Course deleted');
                setIsdelete(true);
            }
            if(data.success === false){
                props.notify('Course has topics, first remove topics from course');
            }
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    const setPageNumber = (page) => {
        setPage(page);
    }

    const paginationButtons = () => {
        let btn = [];
        if (totalCourses) {
            const totalPage = Math.ceil(totalCourses / coursePerPage);
            for (let i = 0; i < totalPage; i++){
                btn.push(
                    <button key={i} className={courseStyle.btn} onClick={() => { setPageNumber(i + 1) }}> {i + 1} </button>
                )
            }
        }
        return btn;
    }

    return (
        <div>
            <div>
            {
                error && <h1>No Courses Found!</h1>
            }
            </div>
            <div className={courseStyle.courses__container}>
            {
                courses &&
                courses.map(course => <Course
                    key={course._id}
                    course={course}
                    removeCourse={removeCourse}
                ></Course>)
            }
            </div>
            {totalCourses > 0 && paginationButtons()}  
        </div>
    );
};

export default Courses;