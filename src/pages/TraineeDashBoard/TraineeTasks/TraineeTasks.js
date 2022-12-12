import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../../utils/localStorage';
import taskStyle from './task.module.css';
import Task from './Task';

const TraineeTasks = (props) => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState();
    const [trainee, setTrainee] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const user = getUser();
    const token = 'Bearer ' + user.access_token;
    const headers={
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_BASE_URL}trainees/${user._id}`)
            .then(res => res.json())
            .then(data => {
                setTrainee(data.results);
                setIsLoading(true);
            })
    }, [])

    useEffect(()=> {
        setIsLoading(false);
        if (trainee.batchId) {
            axios({
                method: 'get',
                url: `${process.env.REACT_APP_BASE_URL}trainer/getBatchAllTask/${trainee.batchId}`,
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
        }
    }, [isLoading]);

    return (
        <div>
            <h2>Tasks</h2>
            <div>
            {
                error && <h1>No Tasks Found!</h1>
            }
            </div>
            { trainee.batchId &&
                <div className={taskStyle.courses__container}>
                {
                    tasks &&
                    tasks.map(task => <Task
                        key={task._id}
                        task={task}
                    ></Task>)
                }
                </div>
            }
        </div>
    );
};

export default TraineeTasks;