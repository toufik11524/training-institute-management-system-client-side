import React from 'react';
import { Link } from 'react-router-dom';
import navStyle from './SideBar.module.css'

const TrainingContent = ({ children }) => {
    return (
    <div className='row'>
      <div className='col-2'>
        <div className={navStyle.nav}>
              <Link className={navStyle.nav__link} to='/trainingHistory/previous'>Previous Batches</Link>
              <Link className={navStyle.nav__link} to='/trainingHistory/ongoing'>Ongoing Batches</Link>
              <Link className={navStyle.nav__link} to='/trainingHistory/upcoming'>UpComing Batches</Link>
        </div>
      </div>
      <div className='col-10'>
        {children}
      </div>
    </div>
  );
};

export default TrainingContent;