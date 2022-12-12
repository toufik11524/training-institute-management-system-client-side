import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getUser } from '../../../utils/localStorage';
import axios from 'axios';

const UpdateTrainer = (props) => {
    const user = getUser();
    const [trainer, setTrainer] = useState({});
    const { trainerId } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, resetField } = useForm({ 
        mode: "onChange"
    });

    useEffect(() => {
        fetch(`http://localhost:4000/trainers/${trainerId}`)
            .then(res => res.json())
            .then(data => {
                setTrainer(data.results);
            });
    }, []);

    const token = 'Bearer ' + user.access_token;
    const headers={
        "Content-Type":"multipart/form-data",
        'Authorization': `${token}`
    };

    const handleUpdate = data => {
        let file =data.trainerImage[0];
        let formData= new FormData();
        if (file) {
            formData.append('trainerImage',data.trainerImage[0]);
        }
        
        formData.append('name',data.name);
        formData.append('email',data.email);
        formData.append('password',data.password);

        // reset Field
        resetField('name');
        resetField('email');
        resetField('password');
        resetField('trainerImage');

        axios({
            method: 'put',
            url: `http://localhost:4000/admin/edit-trainer/${trainerId}`,
            data: formData,
            headers: headers
        })
        .then(function (response) {
            if(response.data.success === true){
                props.notify(response.data.message);
                navigate("/dashboard/trainer");
            }
            else if(response.data.success === false){
                props.notify(response.data.message);
            }
        })
        .catch(function (error) {
            console.log(error);
            // navigate("/internalError");
        });
    }

    return (
        <div>
            <form className='form__style' onSubmit={handleSubmit(handleUpdate)}>
                <h2>Update Trainer Form</h2>
                <label>Name</label><br />
                <input defaultValue={trainer?.name} className='input__field' {...register('name', { 
                    // required: true
                })} /><br />

                <label>Email</label><br />
                <input defaultValue={trainer?.email} className='input__field' {...register('email', { 
                    // required: true
                })} /><br />

                <label>Password</label><br />
                <input defaultValue={trainer?.password} className='input__field' {...register('password', { 
                    // required: true
                    })} /><br />

                <label>Image</label><br />
                <input defaultValue={trainer?.trainerImage} className='input__field'  type="file" {...register('trainerImage', { 
                    // required: true 
                    })} /><br />
                <br />
                <input className='submit' type="submit" />
            </form>
        </div>
    );
};

export default UpdateTrainer;