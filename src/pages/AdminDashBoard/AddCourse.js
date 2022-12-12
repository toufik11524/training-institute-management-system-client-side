import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../utils/localStorage';

const AddCourse = (props) => {
    const [batches, setBatches] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('http://localhost:4000/batches')
            .then(res => res.json())
            .then(data => {
                setBatches(data.results)
            })
            .catch(error => {
                setError('Error!! Data Not Found');
            })
    }, [])

    const user = getUser();
    // console.log(user);
    const navigate = useNavigate();
    const { register, handleSubmit, resetField } = useForm({ 
        mode: "onChange",
        defaultValues: {
            batchId: "",
            name: "",
            category: "",
            detail: "",
            courseImage: ""
        }
    });

    const onSubmit = data => {
        // console.log(data.imageUrl[0]);
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

        // console.log(formData);
        addCourse(formData);
    }
    
    const token = 'Bearer ' + user.access_token;
    const headers={
        "Content-Type":"multipart/form-data",
        'Authorization': `${token}`
    };
    
    const addCourse = data => {
        axios({
            method: 'post',
            url: 'http://localhost:4000/admin/create-course',
            data: data,
            headers: headers
        })
        .then(function (response) {
            if(response.data.success === true){
                props.notify("Course added successfully");
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

    let batchList = batches.length > 0
		&& batches.map((item, i) => <option key={i} value={item._id}
        >{item.name}</option>
	);

    return (
        <form className='form__style' onSubmit={handleSubmit(onSubmit)}>
            <h2>Add Course Form</h2>

            <label>Batch</label>
            <br />
            <select className='input__field' {...register("batchId", { required: true })}> 
                {batchList} 
            </select>
            <br />

            <label>Name</label><br />
            <input className='input__field' {...register('name', { 
                required: true
            })} /><br />

            <label>Category</label><br />
            <input className='input__field' {...register('category', { 
                required: true
            })} /><br />

            <label>Detail</label><br />
            <input className='input__field' {...register('detail', { 
                required: true
                })} /><br />

            <label>Image</label><br />
            <input className='input__field' type="file" {...register('courseImage', { 
                required: true 
                })} /><br /><br />

            <input className='submit' type="submit" />
        </form>
    );
};

export default AddCourse;