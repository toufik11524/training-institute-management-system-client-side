import React, { useEffect, useState } from 'react';
import { getUser } from '../../../utils/localStorage';
import Topic from './Topic';
import './Topic.css';

const Topics = (props) => {
    const user = getUser(); 
    const [topics, setTopics] = useState([]);
    const [error, setError] = useState();
    const [isDelete, setIsdelete] = useState();

    useEffect(()=> {
        fetch(`http://localhost:4000/topics`)
            .then(res => res.json())
            .then(data => {
                setTopics(data.results);
                setIsdelete(false);
            })
            .catch(
                (error) => {
                  setError(error);
                }
            )
    }, [isDelete]);

    // Remove Topic Function
    const removeTopic = topicId => {
        const token = 'Bearer ' + user.access_token;
        fetch(`http://localhost:4000/admin/delete-topic/${topicId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            },
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => {
            if(data.success === true){
                props.notify('Topic deleted');
                setIsdelete(true);
            }
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    return (
        <div>
            <h2>Topics</h2>
            <div>
            {
                error && <h1>No topics Found!</h1>
            }
            </div>
            <div className='topics__container'>
            {
                topics &&
                topics.map(topic => <Topic
                    key={topic._id}
                    topic={topic}
                    removeTopic={removeTopic}
                ></Topic>)
            }
            </div>
        </div>
    );
};

export default Topics;