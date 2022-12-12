import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../../../utils/localStorage';

const UpdateCourse = (props) => {
    const user = getUser();
    const [course, setCourse] = useState({});
    const { courseId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:4000/courses/${courseId}`)
            .then(res => res.json())
            .then(data => {
                setCourse(data.results);
            });
    }, []);

    const { register, handleSubmit, resetField } = useForm({ 
        mode: "onChange"
    });

    const token = 'Bearer ' + user.access_token;
    const headers={
        "Content-Type":"multipart/form-data",
        'Authorization': `${token}`
    };

    const handleUpdate = data => {
        let file =data.courseImage[0];
        let formData= new FormData();
        if (file) {
            formData.append('courseImage',data.courseImage[0]);
        }
        
        formData.append('batchId', data.batchId);
        formData.append('name',data.name);
        formData.append('category',data.category);
        formData.append('detail',data.detail);

        // reset Field
        resetField('batchId');
        resetField('name');
        resetField('category');
        resetField('detail');
        resetField('courseImage');

        axios({
            method: 'put',
            url: `http://localhost:4000/admin/update-course/${courseId}`,
            data: formData,
            headers: headers
        })
        .then(function (response) {
            if(response.data.success === true){
                props.notify(response.data.message);
                navigate("/dashboard/course");
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
                <h2>Update Course Form</h2>

                <label>Batch</label>
                <br />
                <select className='input__field' {...register("batchId", { disabled: true })}> 
                    <option value={course?.batchId}>{course?.batchName}</option>
                </select>
                <br />

                <label>Name</label><br />
                <input defaultValue={course?.name} className='input__field' {...register('name', { 
                    // required: true
                })} /><br />

                <label>Email</label><br />
                <input defaultValue={course?.category} className='input__field' {...register('category', { 
                    // required: true
                })} /><br />

                <label>Password</label><br />
                <input defaultValue={course?.detail} className='input__field' {...register('detail', { 
                    // required: true
                    })} /><br />

                <label>Image</label><br />
                <input defaultValue={course?.courseImage} className='input__field'  type="file" {...register('courseImage', { 
                    // required: true 
                    })} /><br />
                <br />
                <input className='submit' type="submit" />
            </form>
        </div>
    );
};

export default UpdateCourse;