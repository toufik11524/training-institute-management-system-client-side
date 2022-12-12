import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../utils/localStorage';

const AddTask = (props) => {
    const [batches, setBatches] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/batches')
            .then(res => res.json())
            .then(data => {
                setBatches(data.results)
            })
            .catch(error => {
                console.log(error.message);
                setError('Error!! Data Not Found');
            })
    }, [])

    const user = getUser();
    // console.log(user);
    const navigate = useNavigate();
    const { register, handleSubmit, resetField } = useForm({ 
        mode: "onChange",
        defaultValues: {
            batchId: "",
            name: "",
            taskImage: ""
        }
    });

    const onSubmit = data => {
        // console.log(data.imageUrl[0]);
        let file =data.taskImage[0];
        let formData= new FormData();
        if (file) {
            formData.append('taskImage',data.taskImage[0]);
        }
        
        formData.append('batchId', data.batchId);
        formData.append('name',data.name);

        // console.log(formData);
        addTask(formData);
        
        // reset Field
        resetField('batchId');
        resetField('name');
        resetField('taskImage');
    }
    
    const token = 'Bearer ' + user.access_token;
    const headers={
        "Content-Type":"multipart/form-data",
        'Authorization': `${token}`
    };
    
    const addTask = data => {
        axios({
            method: 'post',
            url: 'http://localhost:4000/trainer/task',
            data: data,
            headers: headers
        })
        .then(function (response) {
            if(response.data.success === true){
                props.notify("Task created successfully");
                navigate("/dashboard/tasks");
            }
            else if(response.data.success === false){
                props.notify(response.data.message);
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });
    }

    let batchList = batches.length > 0
		&& batches.map((item, i) => <option key={i} value={item._id}
        >{item.name}</option>
	);

    return (
        <form className='form__style' onSubmit={handleSubmit(onSubmit)}>
            <h2>Create Task</h2>

            <label>Name</label><br />
            <input className='input__field' {...register('name', { 
                required: true
            })} /><br />

            <label>Batch</label>
            <br />
            <select className='input__field' {...register("batchId", { required: true })}> 
                {batchList} 
            </select>
            <br />

            <label>Task Image</label><br />
            <input className='input__field' type="file" {...register('taskImage', { 
                required: true 
            })} /><br /><br />

            <input className='submit' type="submit" />
        </form>
    );
};

export default AddTask;