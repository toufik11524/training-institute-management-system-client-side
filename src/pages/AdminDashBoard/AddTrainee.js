import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getUser } from '../../utils/localStorage';

const AddTrainee = (props) => {

    const user = getUser();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, resetField } = useForm({ 
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            traineeImage: ""
        }
    });

    const onSubmit = data => {
        let file =data.traineeImage[0];
        let formData= new FormData();
        if (file) {
            formData.append('traineeImage',data.traineeImage[0]);
        }
        
        formData.append('name', data.name);
        formData.append('email',data.email);
        formData.append('password',data.password);
        
        // reset Field
        resetField('name');
        resetField('email');
        resetField('password');
        resetField('traineeImage');

        // console.log(data);
        addTrainee(formData);
    }

    const token = 'Bearer ' + user.access_token;
    const headers={
        "Content-Type":"multipart/form-data",
        'Authorization': `${token}`
    };

    const addTrainee = data => {
        // console.log(data);
        axios({
            method: 'post',
            url: 'http://localhost:4000/admin/create-trainee',
            data: data,
            headers: headers
        })
        .then(function (response) {
            if(response.data.success === true){
                setError('');
                props.notify("Trainee Created successfully");
                navigate("/dashboard/trainee");
            }
            else if(response.data.success === false){
                props.notify(response.data.message);
            }
        })
        .catch(function (error) {
            setError('Email is already exist');
            console.log(error);
        });
    }

    return (
        <div>
            <form className='form__style' onSubmit={handleSubmit(onSubmit)}>
                <h2>Add Trainee Form</h2>

                <label>Name</label><br />
                <input className='input__field' {...register('name', { 
                    required: true,
                    pattern: {
                        value: /[A-Za-z]{3}/ ,
                        message: "Character only and minimum 3 length"
                    }
                })} /><br />
                {errors.name?.type === 'required' && <span className='error__message'>Name is required<br /></span>}
                {errors.name && <span className='error__message'>{errors.name.message}<br /></span>}

                <label>Email</label><br />
                <input className='input__field' {...register('email', { 
                    required: true,
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format"
                    }
                })} /><br />
                {errors.email?.type === 'required' && <span className='error__message'>Email is required<br /></span>}
                {errors.email && <span className='error__message'>{errors.email.message}<br /></span>}

                <label>Password</label><br />
                <input className='input__field' type="password" {...register('password', { 
                    required: true,
                    minLength: {
                        value: 4,
                        message: "min length is 5"
                    } ,
                    maxLength: {
                        value: 10,
                        message: "max length is 10"
                    }
                })} /><br />
                {errors.password?.type === 'required' && <span className='error__message'>Password is required<br /></span>}
                {errors.password && <span className='error__message'>{errors.password.message}<br /></span>}

                <label>Image</label><br />
                <input className='input__field' type="file" {...register('traineeImage', { 
                    required: true 
                    })} /><br />
                <br />
                {error && <span className='error__message'>{error}<br /></span>}<br />

                <input className='submit' type="submit" />
            </form>
        </div>
    );
};

export default AddTrainee;