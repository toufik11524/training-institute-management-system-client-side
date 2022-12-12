import React, { useEffect, useState } from 'react';
import batchStyle from '../batch.module.css';
import Batch from './Batch';

const Previous = () => {
    const [batches, setbatches] = useState([]);
    const [error, setError] = useState();

    useEffect(()=> {
        fetch(`http://localhost:4000/batches`)
            .then(res => res.json())
            .then(data => {
                setbatches(data.results);
            })
            .catch(
                (error) => {
                  setError(error);
                }
            )
    }, []);

    const previousBatchs = batches.filter( batch => batch.status == 'completed');

    return (
        <div>
            <div>
            {
                error && <h1>No batches Found!</h1>
            }
            </div>
            <div className={batchStyle.batches__container}>
            {
                previousBatchs &&
                previousBatchs.map(batch => <Batch
                    key={batch._id}
                    batch={batch}
                ></Batch>)
            }
            </div>
        </div>
    );
};

export default Previous;