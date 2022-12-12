import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getUser } from '../../../utils/localStorage';
import axios from 'axios';

const UpdateTrainee = (props) => {
    const user = getUser();
    const [trainee, setTrainee] = useState({});
    const { traineeId } = useParams();
    const navigate = useNavigate();

    const { register, handleSubmit, resetField } = useForm({ 
        mode: "onChange"
    });

    useEffect(() => {
        fetch(`http://localhost:4000/trainees/${traineeId}`)
            .then(res => res.json())
            .then(data => {
                setTrainee(data.results);
            });
    }, []);

    const token = 'Bearer ' + user.access_token;
    const headers={
        "Content-Type":"multipart/form-data",
        'Authorization': `${token}`
    };

    const handleUpdate = data => {
        let file =data.traineeImage[0];
        let formData= new FormData();
        if (file) {
            formData.append('traineeImage',data.traineeImage[0]);
        }
        
        formData.append('name',data.name);
        formData.append('email',data.email);
        formData.append('password',data.password);

        // reset Field
        resetField('name');
        resetField('email');
        resetField('password');
        resetField('traineeImage');

        axios({
            method: 'put',
            url: `http://localhost:4000/admin/edit-trainee/${traineeId}`,
            data: formData,
            headers: headers
        })
        .then(function (response) {
            if(response.data.success === true){
                props.notify(response.data.message);
                navigate("/dashboard/trainee");
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
                <h2>Update Trainee Form</h2>
                <label>Name</label><br />
                <input defaultValue={trainee?.name} className='input__field' {...register('name', { 
                    // required: true
                })} /><br />

                <label>Email</label><br />
                <input defaultValue={trainee?.email} className='input__field' {...register('email', { 
                    // required: true
                })} /><br />

                <label>Password</label><br />
                <input defaultValue={trainee?.password} className='input__field' {...register('password', { 
                    // required: true
                    })} /><br />

                <label>Image</label><br />
                <input defaultValue={trainee?.traineeImage} className='input__field'  type="file" {...register('traineeImage', { 
                    // required: true 
                    })} /><br />
                <br />
                <input className='submit' type="submit" />
            </form>
        </div>
    );
};

export default UpdateTrainee;