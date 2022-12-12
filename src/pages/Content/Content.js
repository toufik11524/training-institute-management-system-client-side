import React from 'react';
import navStyle from './SideBar.module.css'
import { Link } from 'react-router-dom';
import { getUser } from '../../utils/localStorage';

const Content = ({ children }) => {
  const user = getUser();
    return (
    <div className='row'>
      <div className='col-2'>
        <div className={navStyle.nav}>
          {user?.role === "1" && ( 
            <>
              <Link className={navStyle.nav__link} to='/dashboard/batch'>Batch</Link>
              <Link className={navStyle.nav__link} to='/dashboard/course'>Course</Link>
              <Link className={navStyle.nav__link} to='/dashboard/trainer'>Trainer</Link>
              <Link className={navStyle.nav__link} to='/dashboard/trainee'>Trainee</Link>
              <Link className={navStyle.nav__link} to='/dashboard/topic'>Topics</Link>
              <Link className={navStyle.nav__link} to='/dashboard/addBatch'>Create Batch</Link>
              <Link className={navStyle.nav__link} to='/dashboard/addCourse'>Create Course</Link>
              <Link className={navStyle.nav__link} to='/dashboard/addTopic'>Create Topic</Link>
              <Link className={navStyle.nav__link} to='/dashboard/addTrainer'>Create Trainer</Link>
              <Link className={navStyle.nav__link} to='/dashboard/addTrainee'>Create Trainee</Link>
            </>
          )} 

          {user?.role === "2" && ( 
            <>
              <Link className={navStyle.nav__link} to='/dashboard/tasks'>Task</Link>
              <Link className={navStyle.nav__link} to='/dashboard/addTask'>Create Task</Link>
            </>
          )} 

          {user?.role === "3" && ( 
            <>
              <Link className={navStyle.nav__link} to='/dashboard/traineeTask'>Task View</Link>
            </>
          )} 
        </div>
      </div>
      <div className='col-10'>
        {children}
      </div>
    </div>
  );
};

export default Content;