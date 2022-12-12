import React from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ForgetPassword = () => {
    const notify = (message) => toast(message);
    const { register, handleSubmit, formState: { errors }, resetField } = useForm({ 
        mode: "onChange",
        defaultValues: {
            email: ""
        }
    });

    const onSubmit = data => {
        fetch(`${process.env.REACT_APP_BASE_URL}send-reset-password-mail`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                notify(data.message);
            }
            else {
                notify(data.message);
            }
        })
        .catch((error) => {
            // console.error('Error:', error);
            notify("Error!! something worng");
        });

        // reset Field
        resetField('email');
    }

    return (
        <div style={{ height: '350px' }}>
            <ToastContainer />
            <form className='form__style' onSubmit={handleSubmit(onSubmit)}>
                <h2>Recover Password</h2>
                <label>Email</label><br />
                <input className='input__field' {...register('email', { 
                    required: true,
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Entered value does not match email format"
                    }
                })} /><br />
                {errors.email?.type === 'required' && <span className='error__message'>Email is required<br /></span>}
                {errors.email && <span className='error__message'>{errors.email.message}<br /></span>}<br />

                <input className='submit' type="submit" /><br />
            </form>
        </div>
    );
};

export default ForgetPassword;