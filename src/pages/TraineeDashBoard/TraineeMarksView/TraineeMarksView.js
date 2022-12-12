import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../../../utils/localStorage';
import TaskMark from './TaskMark';
import './TaskMarks.css';
import Chart from "react-apexcharts";

const TraineeMarksView = () => {
    const user = getUser();
    const { taskId } = useParams();

    const [task, setTask] = useState({});
    const [isLoading, setIsLoading] = useState();
    const [error, setError] = useState();
    const [marks, setMarks] = useState([]);

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
                setMarks(response.data.results.taskMarks);

                setIsLoading(false);
            }
            else if(response.data.success === false){
                console.log(response.data.message);
            }
        })
        .catch(function (error) {
            console.log(error.message);
            setError(error.message);
            setIsLoading(false);
        })
    }, []);
    // console.log(marks);

    let marksArray = [];
    let nameArray = [];
    for (let i=0; i<marks.length; i++) {
        marksArray.push(marks[i].marks);
        nameArray.push(marks[i].trainee.name);
    }

    // Chart
    const options = {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: nameArray,
        },
      };
      const series = [
        {
          name: "series-1",
          data: marksArray,
        },
      ];

    return (
        <div>
            <h3>{task.name}</h3>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Trainee Name</th>
                        <th>Marks</th>
                    </tr>
                </thead>
                <tbody style={{backgroundColor: 'yellow', color: 'black', fontWeight: 'bold'}}>
                {
                    marks.map((taskMark) => <TaskMark
                        key={taskMark._id}
                        taskMark={taskMark}
                    ></TaskMark>)
                }
                </tbody>
            </table>
            <div>
                <Chart style={{ marginLeft: '200px' }} options={options} series={series} type="bar" width="750" />
            </div>
        </div>
    );
};

export default TraineeMarksView;