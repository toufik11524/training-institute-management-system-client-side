import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../utils/localStorage';

const AddTrainer = (props) => {
    const [topics, setTopics] = useState([]);
    const [error, setError] = useState();

    useEffect(() => {
        fetch('http://localhost:4000/topics')
            .then(res => res.json())
            .then(data => {
                setTopics(data.results)
            })
            .catch(error => {
                setError(error.message);
            })
    }, [])

    const user = getUser();
    // console.log(user);
    const navigate = useNavigate();
    const { register, handleSubmit,formState: { errors }, resetField } = useForm({ 
        mode: "onChange",
        defaultValues: {
            name: "",
            email: "",
            password: "",
            trainerImage: "",
            topicId: "",
        }
    });

    const onSubmit = data => {
        // console.log(data.imageUrl[0]);
        let file =data.trainerImage[0];
        let formData= new FormData();
        if (file) {
            formData.append('trainerImage',data.trainerImage[0]);
        }
        
        formData.append('name',data.name);
        formData.append('email',data.email);
        formData.append('password',data.password);
        formData.append('topicId',data.topicId);

        // console.log(formData);
        addTrainer(formData);
        
        // reset Field
        resetField('name');
        resetField('email');
        resetField('password');
        resetField('trainerImage');
    }
    
    const token = 'Bearer ' + user.access_token;
    const headers={
        "Content-Type":"multipart/form-data",
        'Authorization': `${token}`
    };
    
    const addTrainer = data => {
        axios({
            method: 'post',
            url: `http://localhost:4000/admin/create-trainer`,
            data: data,
            headers: headers
        })
        .then(function (response) {
            if(response.data.success === true){
                props.notify("Trainer created successfully");
                navigate("/dashboard/trainer");
            }
            else if(response.data.success === false){
                props.notify(response.data.message);
            }
        })
        .catch(function (error) {
            console.log(error.message);
            // navigate("/internalError");
            setError('Email is already exist');
        });
    }

    let topicList = topics.length > 0
		&& topics.map((item, i) => <option key={i} value={item._id}
        >{item.name}</option>
	);

    return (
        <form className='form__style' onSubmit={handleSubmit(onSubmit)}>
            <h2>Create Trainer Form</h2>

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
            <input className='input__field' type="file" {...register('trainerImage', { 
                required: true 
            })} /><br />

            <label>Topic</label>
            <br />
            <select className='input__field' {...register("topicId", { required: true })}> 
                {topicList} 
            </select>
            <br /><br />
            {error && <span className='error__message'>{error}<br /></span>}<br />

            <input className='submit' type="submit" />
        </form>
    );
};

export default AddTrainer;