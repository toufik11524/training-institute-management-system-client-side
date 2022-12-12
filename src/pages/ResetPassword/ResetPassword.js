import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

const ResetPassword = (props) => {
    const { token, userId } = useParams();
    const [error, setError] = useState();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, resetField, watch } = useForm({ 
        mode: "onChange",
        defaultValues: {
            token: "",
            userId: "",
            password: "",
            confirmPassword: ""
        }
    });

    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = data => {
        let newData = {
            token: token,
            userId: userId,
            password: data.password,
            confirmPassword: data.confirmPassword
        }

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL}reset-password`,
            data: JSON.stringify(newData),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(function (response) {
            if(response.data.success === true){
                props.notify(response.data.message);
                navigate("/signin");
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
        resetField('password');
        resetField('confirmPassword');
    }

    return (
        <div style={{ height: '350px' }}>
            <form className='form__style' onSubmit={handleSubmit(onSubmit)}>
                <h2>Reset Password</h2>
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

                <label>Confirm Password</label><br />
                <input className='input__field' type="password" {...register('confirmPassword', { 
                    required: true,
                    validate: value =>
                    value === password.current || "The passwords do not match"
                    })} /><br />
                {errors.confirmPassword && <span className='error__message'>{errors.confirmPassword.message}<br /></span>}
                {errors.confirmPassword?.type === 'required' && <span className='error__message'>Field is required<br /></span>}
                {error && <span className='error__message'>{error}<br /></span>}<br />

                <input className='submit' type="submit" /><br />
            </form>
        </div>
    );
};

export default ResetPassword;