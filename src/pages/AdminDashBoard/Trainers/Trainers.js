import React, { useEffect, useState } from 'react';
import { getUser } from '../../../utils/localStorage';
import Trainer from './Trainer';
import trainerStyle from './trainer.module.css';

const Trainers = (props) => {
    const [trainers, setTrainers] = useState([]);
    const [isDelete, setIsdelete] = useState();
    const [error, setError] = useState();

    useEffect(()=> {
        fetch(`http://localhost:4000/trainers/`)
            .then(res => res.json())
            .then(data => {
                setTrainers(data.results);
                // console.log(data.results);
                setIsdelete(false);
            })
            .catch(
                (error) => {
                  setError(error.message);
                }
            )
    }, [isDelete]);

    const user = getUser();

    const removeTrainer = trainer => {
        const token = 'Bearer ' + user.access_token;

        // // trainer remove from batch
        // if (trainer?.batchId) {
        //     axios({
        //         method: "delete",
        //         url: `http://localhost:4000/admin/deleteFromBatch/${trainer?.batchId}`,
        //         data: JSON.stringify({ trainerId: `${trainer._id}` }),
        //         headers: {
        //                 'Content-Type': 'application/json',
        //                 'Authorization': `${token}`
        //         }
        //     })
        //     .then(function (response) {
        //         if (response.data.success === true) {
        //             // props.notify('trainer remove from batch');
        //             setIsdelete(true);
        //         } else if (response.data.success === false) {
        //         props.notify(response.data.message);
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
        // }
        fetch(`http://localhost:4000/admin/delete-trainer/${trainer._id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            if(data.success === true){
                props.notify('Trainer deleted');
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
                error && <h1>No Trainer Found!</h1>
            }
            </div>
            <div className={trainerStyle.trainers__container}>
            {
                trainers &&
                trainers.map(trainer => <Trainer
                    key={trainer._id}
                    trainer={trainer}
                    removeTrainer={removeTrainer}
                ></Trainer>)
            }
            </div>

        </div>
    );
};

export default Trainers;