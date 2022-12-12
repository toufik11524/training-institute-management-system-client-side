import React from 'react';

const TaskMark = (props) => {
    const { taskMark } = props;
    return (
        <tr>
            <td>{taskMark.trainee.name}</td>
            <td>{taskMark.marks}</td>
        </tr>
    );
};

export default TaskMark;