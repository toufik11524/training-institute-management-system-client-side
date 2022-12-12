import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import Course from './Course';
import courseStyle from './courses.module.css';

const Courses = (props) => {    
    const coursePerPage = 4;

    const [courses, setCourses] = useState([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalCourses, setTotalCourses] = useState([]);

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
    // }, []);

    useEffect(()=> {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_BASE_URL}courses?page=${page}&coursePerPage=${coursePerPage}`)
            .then(res => res.json())
            .then(data => {
                setCourses(data.results.courses);
                setTotalCourses(data.results.total);
                // console.log(data.results);
                setIsLoading(false);
                
            })
            .catch(
                (error) => {
                  setError(error);
                  setIsLoading(false);
                }
            )
    }, [page]);

    if(isLoading) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
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
                ></Course>)
            }
            </div>
            <br />
            {totalCourses > 0 && paginationButtons()}  
        </div>
    );
};

export default Courses;