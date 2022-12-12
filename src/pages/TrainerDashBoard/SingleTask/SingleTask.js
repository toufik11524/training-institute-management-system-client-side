import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './SingleTask.css';
import { useForm } from 'react-hook-form';
import { getUser } from '../../../utils/localStorage';
import axios from 'axios';

const SingleTask = (props) => {
    const user = getUser();
    const { taskId } = useParams();

    const { register, handleSubmit, resetField } = useForm({ 
        mode: "onChange",
        defaultValues: {
            traineeId: "",
            marks: ""
        }
    });

    const [task, setTask] = useState({});
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();
    const [trainees, setTrainees] = useState([]);

    const token = 'Bearer ' + user.access_token;
    const headers={
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    };

    useEffect(()=> {
        setIsLoading(true);
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_BASE_URL}trainer/tasks/${taskId}`,
            headers: headers
        })
        .then(function (response) {
            if(response.data.success === true){
                setTask(response.data.results);
                setIsLoading(false);
            }
            else if(response.data.success === false){
                props.notify(response.data.message);
            }
        })
        .catch(function (error) {
            console.log(error.message);
            setError(error.message);
            setIsLoading(false);
        })
    }, []);

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

    let traineeList = trainees.length > 0
		&& trainees.map((item, i) => <option key={i} value={item._id}
        >{item.name}</option>
	);

    const onSubmit = data => {
        // console.log('data', data);
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL}trainer/postSubmitMarks/${taskId}`,
            data: data,
            headers: headers
        })
        .then(function (response) {
            if(response.data.success === true){
                props.notify("Mark added to Trainee for this Task");
            }
            else if(response.data.success === false){
                props.notify(response.data.message);
            }
        })
        .catch(function (error) {
            console.log(error.message);
            props.notify("Error! something wrong");
        }); 

        // reset Field
        resetField('traineeId');
        resetField('marks');
    }

    if(isLoading) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    }

    return (
        <div className='task'>
            <div>
            {
                error ? <h1>Data not found! Error!</h1> :
                <div>  
                    {
                        task.taskImage && <Card.Img style={{ height: '200px', width: '200px', marginLeft: "40px"}} variant="top" src={`${process.env.REACT_APP_BASE_URL}` + task.taskImage} />
                    }
                    <h4>{task.name}</h4>
                    <hr />
                </div>
            }
            </div>
            <form className='form__addMark' onSubmit={handleSubmit(onSubmit)}>
                <h2>Add Marks to this Task</h2>
                <label>Trainee</label>
                <br />
                <select className='input__field' {...register("traineeId", { required: true })}> 
                    {traineeList} 
                </select>
                <br />
                <label>Marks</label><br />
                    <input className='input__field' {...register('marks', { 
                        required: true 
                })} /><br /><br />
                
                <input className='submit' type="submit" />
            </form>
        </div>
    );
};

export default SingleTask;