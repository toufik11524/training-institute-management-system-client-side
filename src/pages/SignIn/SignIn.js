import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
// import { addToLS } from '../../utils/localStorage';
import { addToLS } from '../../utils/localStorage';
import './Form.css';
import { useState } from 'react';

const SignIn = (props) => {
    const [error, setError] = useState();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, resetField } = useForm({ 
        mode: "onChange",
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = data => {
        fetch('http://localhost:4000/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                addToLS(data.results);
                // console.log(data.results);
                navigate('/');
                props.notify("Succesfully Login");
                // props.setRemoveCartUI(false);
            } else {
                setError('Email Password not correct');
                localStorage.removeItem('user');
            }
        })
        .catch((error) => {
            console.error('Error:', error.message);
            // alert(error.message);
            // clearTheUser();
            localStorage.removeItem('user');
            // navigate("/");
        });
        
        // reset Field
        resetField('email');
        resetField('password');
    }

    return (
        <div style={{ height: '350px' }}>
            <form className='form__style' onSubmit={handleSubmit(onSubmit)}>
                <h2>Please SignIn</h2>
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
                {error && <span className='error__message'>{error}<br /></span>}
                <Link to='/forget-password'>forget password</Link><br /><br />

                <input className='submit' type="submit" /><br />
            </form>
        </div>
    );
};

export default SignIn;