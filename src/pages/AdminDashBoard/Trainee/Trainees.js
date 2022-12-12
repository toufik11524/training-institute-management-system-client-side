import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getUser } from '../../../utils/localStorage';
import Trainee from './Trainee';
import traineeStlye from './trainee.module.css';

const Trainees = (props) => {
    const [trainees, setTrainees] = useState([]);
    const [isDelete, setIsdelete] = useState();
    const [error, setError] = useState();

    useEffect(()=> {
        fetch(`http://localhost:4000/trainees/`)
            .then(res => res.json())
            .then(data => {
                setTrainees(data.results);
                // console.log(data.results);
                setIsdelete(false);
            })
            .catch(
                (error) => {
                  setError(error);
                }
            )
    }, [isDelete]);

    const user = getUser();

    const removeTrainee = trainee => {
        const token = 'Bearer ' + user.access_token;

        // Trainee remove from batch
        if (trainee?.batchId) {
            axios({
                method: "delete",
                url: `http://localhost:4000/admin/deleteFromBatch/${trainee?.batchId}`,
                data: JSON.stringify({ traineeId: `${trainee._id}` }),
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`
                }
            })
            .then(function (response) {
                if (response.data.success === true) {
                    // props.notify('Trainee remove from batch');
                    setIsdelete(true);
                } else if (response.data.success === false) {
                props.notify(response.data.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
        }
        fetch(`http://localhost:4000/admin/delete-trainee/${trainee._id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            if(data.success === true){
                props.notify('Trainee deleted');
                setIsdelete(true);
            }
        })
        .catch(error => {
            console.log(error.message);
        })
    }


    return (
        <div>
            <div>
            {
                error && <h1>No Trainees Found!</h1>
            }
            </div>
            <div className={traineeStlye.trainees__container}>
            {
                trainees &&
                trainees.map(trainee => <Trainee
                    key={trainee._id}
                    trainee={trainee}
                    removeTrainee={removeTrainee}
                ></Trainee>)
            }
            </div>

        </div>
    );
};

export default Trainees;