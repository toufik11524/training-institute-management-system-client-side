import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../../../utils/localStorage';

const UpdateTopic = (props) => {

    const user = getUser();
    const [topic, setTopic] = useState({});
    const { topicId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:4000/topics/${topicId}`)
            .then(res => res.json())
            .then(data => {
                setTopic(data.results);
            });
    }, []);

    const { register, handleSubmit, resetField } = useForm({ 
        mode: "onChange"
    });

    const token = 'Bearer ' + user.access_token;
    const headers={
        "Content-Type": 'application/json',
        'Authorization': `${token}`
    };

    const handleUpdate = data => {
        axios({
            method: 'put',
            url: `http://localhost:4000/admin/update-topic/${topicId}`,
            data: data,
            headers: headers
        })
        .then(function (response) {
            if(response.data.success === true){
                props.notify(response.data.message);
                navigate("/dashboard/topic");
            }
            else if(response.data.success === false){
                props.notify(response.data.message);
            }
        })
        .catch(function (error) {
            console.log(error);
            // navigate("/internalError");
        });

        // reset Field
        resetField('name');
        resetField('duration');
    }

    return (
        <div>
            <form className='form__style' onSubmit={handleSubmit(handleUpdate)}>
                <h2>Update Topic Form</h2>

                <label>Name</label><br />
                <input defaultValue={topic?.name} className='input__field' {...register('name', { 
                    // required: true
                })} /><br />

                <label>Email</label><br />
                <input defaultValue={topic?.duration} className='input__field' {...register('duration', { 
                    // required: true
                })} /><br /><br />

                <input className='submit' type="submit" />
            </form>
        </div>
    );
};

export default UpdateTopic;