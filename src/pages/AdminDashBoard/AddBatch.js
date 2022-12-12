import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../utils/localStorage';

const AddBatch = (props) => {
    const status = [{name: "completed"}, {name: "ongoing"}, {name: "upcoming"}];

    const user = getUser();
    // console.log(user);
    const navigate = useNavigate();
    const { register, handleSubmit, resetField } = useForm({ 
        mode: "onChange",
        defaultValues: {
            name: "",
            duration: "",
            startDate: Date,
            endDate: Date,
            status: ""
        }
    });

    const token = 'Bearer ' + user.access_token;
    const headers = {
        "Content-Type": 'application/json',
        'Authorization': `${token}`
    };

    const onSubmit = data => {
        fetch('http://localhost:4000/admin/create-batch', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    props.notify("Batch Created successfully");
                    navigate("/dashboard/batch");
                } else {
                    props.notify(data.message);
                }
            })
            .catch((error) => {
                console.log(error.message);
                // navigate("/");
            });

        // reset Field
        resetField('name');
        resetField('duration');
        resetField('startDate');
        resetField('endDate');
        resetField('status');
    }
    
    let statusList = status.length > 0
		&& status.map((item, i) => <option key={i} value={item.name}
        >{item.name}</option>
	);

    return (
        <form className='form__style' onSubmit={handleSubmit(onSubmit)}>
            <h2>Create Batch Form</h2>

            <label>Name</label><br />
            <input className='input__field' {...register('name', { 
                required: true
            })} /><br />

            <label>Duration</label><br />
            <input className='input__field' {...register('duration', { 
                required: true
            })} /><br />

            <label>Start Date</label><br />
            <input className='input__field' type="date" {...register('startDate', { 
                required: true
            })} /><br />

            <label>End Date</label><br />
            <input className='input__field' type="date" {...register('endDate', { 
                required: true
            })} /><br />

            <label>Status</label><br />
            <select className='input__field' {...register("status", { required: true })}> 
                {statusList} 
            </select>
            <br />
            <br />

            <input className='submit' type="submit" />
        </form>
    );
};

export default AddBatch;