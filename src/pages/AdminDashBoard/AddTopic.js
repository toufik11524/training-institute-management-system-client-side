import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../utils/localStorage';

const AddTopic = (props) => {
    const [error, setError] = useState('');

    const user = getUser();
    // console.log(user);
    const navigate = useNavigate();
    const { register, handleSubmit, resetField } = useForm({ 
        mode: "onChange",
        defaultValues: {
            name: "",
            duration: "",
        }
    });

    const onSubmit = data => {
        addTopic(data);
        
        // reset Field
        resetField('courseId');
        resetField('name');
        resetField('duration');
    }
    
    const token = 'Bearer ' + user.access_token;
    const headers={
        "Content-Type": 'application/json',
        'Authorization': `${token}`
    };
    
    const addTopic = data => {
        // console.log(data);
        axios({
            method: 'post',
            url: 'http://localhost:4000/admin/create-topic',
            data: data,
            headers: headers
        })
        .then(function (response) {
            if(response.data.success === true){
                props.notify("Topic created successfully");
                navigate("/dashboard/topic");
            }
            else if(response.data.success === false){
                props.notify(response.data.message);
            }
        })
        .catch(function (error) {
            console.log(error);
            setError(error.message);
            // navigate("/internalError");
        });
    }

    return (
        <form className='form__style' onSubmit={handleSubmit(onSubmit)}>
            <h2>Create Topic Form</h2>

            <label>Name</label><br />
            <input className='input__field' {...register('name', { 
                required: true
            })} /><br />

            <label>Duration</label><br />
            <input className='input__field' {...register('duration', { 
                required: true
            })} /><br /><br />

            <input className='submit' type="submit" />
        </form>
    );
};

export default AddTopic;