import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Trainee from './Trainee';
import './SingleBatch.css';
import { useForm } from 'react-hook-form';
import { getUser } from '../../../utils/localStorage';
import axios from 'axios';
import Course from './Course';

const SingleBatch = (props) => {
    const user = getUser();

    const { register, handleSubmit, resetField } = useForm({ 
        mode: "onChange",
        defaultValues: {
            traineeId: ""
        }
    });

    const [isaddToBatch, setIsAddToBatch] = useState();
    const [batch, setBatch] = useState({});
    const [listTrainees, setListTrainees] = useState([]);
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDelete, setIsdelete] = useState();
    const [error, setError] = useState();
    const { batchId } = useParams();

    const [trainees, setTrainees] = useState([]);

    useEffect(()=> {
        fetch(`http://localhost:4000/trainees/`)
            .then(res => res.json())
            .then(data => {
                setTrainees(data.results);
            })
            .catch(
                (error) => {
                  setError(error);
                }
            )
    }, []);

    useEffect(()=> {
        fetch(`http://localhost:4000/batch/courses/${batchId}`)
            .then(res => res.json())
            .then(data => {
                setCourses(data.results);
            })
            .catch(
                (error) => {
                  setError(error);
                }
            )
    }, []);

    let traineeList = trainees.length > 0
		&& trainees.map((item, i) => <option key={i} value={item._id}
        >{item.name}</option>
	);

    const onSubmit = data => {
        // console.log('data', data);
        addToBatch(data);
        // reset Field
        resetField('traineeId');
    }

    const addToBatch = data => {
        const token = 'Bearer ' + user.access_token;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        };

        axios({
            method: 'post',
            url: `http://localhost:4000/admin/addToBatch/${batchId}`,
            data: JSON.stringify({"traineeId": `${data.traineeId}`}),
            headers: headers
        })
        .then(function (response) {
            if(response.data.success === true){
                props.notify("Trainee added to Batch");
                setIsAddToBatch(true);
            }
            else if(response.data.success === false){
                alert(response.data.message);
            }
        })
        .catch(function (error) {
            console.log(error);
            props.notify("Error! something wrong");
        }); 
    }
    
    useEffect(()=> {
        setIsLoading(true);
        fetch(`http://localhost:4000/batches/${batchId}`)
            .then(res => res.json())
            .then(data => {
                setBatch(data.results);
                setListTrainees(data.results.trainees);
                setIsLoading(false);
                setIsAddToBatch(false);
                setIsdelete(false);
            })
            .catch(
                (error) => {
                  setError(error);
                  setIsLoading(false);
                }
            )
    }, [isaddToBatch, isDelete]);

    if(isLoading) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    }

    // remove trainee from batch
    const removeFromBatch = (traineeId) => {
        const token = "Bearer " + user.access_token;
        const headers = {
            "Content-Type": "application/json",
            Authorization: `${token}`
        };

        axios({
            method: "delete",
            url: `http://localhost:4000/admin/deleteFromBatch/${batch._id}`,
            data: JSON.stringify({ traineeId: `${traineeId}` }),
            headers: headers,
        })
        .then(function (response) {
            if (response.data.success === true) {
            props.notify('Trainee remove from batch');
            setIsdelete(true);
            } else if (response.data.success === false) {
            props.notify(response.data.message);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className='batch'>
            <div>
            {
                error ? <h1>Data not found! Error!</h1> :
                <div>  
                    {/* <h4>BatchId: {batch._id}</h4> */}
                    <h4>{batch.name}</h4>
                    <h4>Duration: {batch.duration}</h4>
                    <h5>Start: {batch.startDate}</h5>
                    <h5>End: {batch.endDate}</h5>
                    <hr />
                    <h3>Course List</h3>
                    <div>
                        {
                            courses?.map(course => <Course
                                key={course._id}
                                course={course}
                            ></Course>)
                        }
                    </div>
                    <hr />
                    <h3>Trainee List</h3>
                    <div>
                        {
                            listTrainees?.map(td => <Trainee
                                key={td._id}
                                trainee={td.trainee}
                                removeFromBatch={removeFromBatch}
                            ></Trainee>)
                        }
                    </div>
                </div>
            }
            </div>
            <hr />
            <form className='batch__form' onSubmit={handleSubmit(onSubmit)}>
                <h2>Add Trainee to this Batch</h2>

                <label>Trainee</label>
                <br />
                <select className='input__field' {...register("traineeId", { required: true })}> 
                    {traineeList} 
                </select>
                <br />
                <br />
                <input className='submit' type="submit" />
            </form>
        </div>
    );
};

export default SingleBatch;