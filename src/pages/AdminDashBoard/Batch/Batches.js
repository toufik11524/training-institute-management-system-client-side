import React, { useEffect, useState } from 'react';
import Batch from './Batch';
import batchStyle from './batch.module.css';

const Batches = () => {
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
    }, [])

    return (
        <div>
            <div>
            {
                error && <h1>No batches Found!</h1>
            }
            </div>
            <div className={batchStyle.batches__container}>
            {
                batches &&
                batches.map(batch => <Batch
                    key={batch._id}
                    batch={batch}
                ></Batch>)
            }
            </div>
        </div>
    );
};

export default Batches;