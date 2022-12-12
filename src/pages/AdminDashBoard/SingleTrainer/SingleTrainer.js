import React, { useEffect, useState } from 'react';
import { Card, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Topic from './Topic';
import './SingleTrainer.css';
import { useForm } from 'react-hook-form';
import { getUser } from '../../../utils/localStorage';
import axios from 'axios';

const SingleTrainer = (props) => {
    const user = getUser();
    const { trainerId } = useParams();

    const { register, handleSubmit, resetField } = useForm({ 
        mode: "onChange",
        defaultValues: {
            topicId: ""
        }
    });

    const [isaddToTrainer, setIsAddToTrainer] = useState();
    const [trainer, setTrainer] = useState({});
    const [listTopics, setListTopics] = useState([]);
    const [isLoading, setIsLoading] = useState();
    const [isDelete, setIsdelete] = useState();
    const [error, setError] = useState();

    const [topics, setTopics] = useState([]);

    useEffect(()=> {
        setIsLoading(true);
        fetch(`${process.env.REACT_APP_BASE_URL}trainers/${trainerId}`)
            .then(res => res.json())
            .then(data => {
                setTrainer(data.results);
                setListTopics(data.results.topics);
                setIsLoading(false);
                setIsAddToTrainer(false);
                setIsdelete(false);
            })
            .catch(
                (error) => {
                    console.log(error.message);
                    setError(error);
                    setIsLoading(false);
                }
            )
    }, [isaddToTrainer, isDelete]);

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_BASE_URL}topics`)
            .then(res => res.json())
            .then(data => {
                setTopics(data.results);
            })
            .catch(
                (error) => {
                  setError(error);
                  console.log(error.message);
                }
            )
    }, []);

    let topicList = topics.length > 0
		&& topics.map((item, i) => <option key={i} value={item._id}
        >{item.name}</option>
	);

    const token = 'Bearer ' + user.access_token;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
    };

    const onSubmit = data => {
        // console.log('data', data);
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_BASE_URL}admin/addToTrainer/${trainerId}`,
            // data: JSON.stringify({"topicId": `${data.topicId}`}),
            data: data,
            headers: headers
        })
        .then(function (response) {
            if(response.data.success === true){
                props.notify("Topic added to Trainer");
                setIsAddToTrainer(true);
            }
            else if(response.data.success === false){
                props.notify(response.data.message);
            }
        })
        .catch(function (error) {
            console.log(error.message);
            props.notify("Error! something wrong");
        }); 

        // reset Field
        resetField('topicId');
    }

    if(isLoading) {
        return <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    }

    // remove topic from Trainer
    const removeFromTrainer = (topicId) => {
        axios({
            method: "delete",
            url: `${process.env.REACT_APP_BASE_URL}admin/removeToTrainer/${trainerId}`,
            data: JSON.stringify({ topicId: `${topicId}` }),
            headers: headers,
        })
        .then(function (response) {
            if (response.data.success === true) {
                props.notify('Topic remove from Trainer');
                setIsdelete(true);
            } else if (response.data.success === false) {
                props.notify(response.data.message);
            }
        })
        .catch(function (error) {
            console.log(error.message);
        });
    }

    return (
        <div className='batch'>
            <div>
            {
                error ? <h1>Data not found! Error!</h1> :
                <div>  
                    {
                        trainer.courseImage && <Card.Img style={{ height: '200px', width: '200px', marginLeft: "40px"}} variant="top" src={`${process.env.REACT_APP_BASE_URL}` + trainer.courseImage} />
                    }
                    {/* <h4>Trainer ID: {trainer._id}</h4> */}
                    <h4>{trainer.name}</h4>
                    <h5>{trainer.email}</h5>
                    <hr />
                    <h3>Topic List</h3>
                    <div>
                        {
                            listTopics?.map(topics => <Topic
                                key={topics._id}
                                topic={topics.topic}
                                removeFromTrainer={removeFromTrainer}
                            ></Topic>)
                        }
                    </div>
                </div>
            }
            </div>
            <hr />
            <form className='trainer__form' onSubmit={handleSubmit(onSubmit)}>
                <h2>Add Topic to the Trainer</h2>
                <label>Topics</label>
                <br />
                <select className='input__field' {...register("topicId", { required: true })}> 
                    {topicList} 
                </select>
                <br />
                <br />
                <input className='submit' type="submit" />
            </form>
        </div>
    );
};

export default SingleTrainer;