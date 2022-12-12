import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../../utils/localStorage';
import Task from './Task';
import taskStyle from './task.module.css';

const Tasks = (props) => {   

    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState();

    const user = getUser();
    const token = 'Bearer ' + user.access_token;
    const headers={
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    };

    useEffect(()=> {
        axios({
            method: 'get',
            url: `${process.env.REACT_APP_BASE_URL}trainer/task/${user._id}`,
            headers: headers
        })
        .then(function (response) {
            if(response.data.success === true){
                setTasks(response.data.results);
            }
            else if(response.data.success === false){
                props.notify(response.data.message);
            }
        })
        .catch(function (error) {
            console.log(error.message);
        })
    }, []);

    return (
        <div>
            <h2>Tasks</h2>
            <div>
            {
                error && <h1>No Tasks Found!</h1>
            }
            </div>
            <div className={taskStyle.courses__container}>
            {
                tasks &&
                tasks.map(task => <Task
                    key={task._id}
                    task={task}
                ></Task>)
            }
            </div>
        </div>
    );
};

export default Tasks;