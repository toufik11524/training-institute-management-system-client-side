import React from 'react';
import './About.css';
import about from '../../assets/images/about_us.jpg';

const About = () => {
    return (
        <div className='row'>
            <h1>About Us</h1>
            <div className='col-4'>
                <img style={{ width: '350px', height: '350px'}} src={about} alt="about pic" />
            </div>
            <div className='col-8'>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Facilis distinctio doloremque id molestiae, maxime aliquid suscipit, 
                    assumenda tempora doloribus, deserunt asperiores voluptatibus dolore laboriosam est. 
                    Cupiditate impedit saepe dolorum corporis laudantium assumenda repellat minus! 
                    Qui veniam sapiente illum animi voluptatibus officiis, delectus magni neque, 
                    hic dolores rerum facilis ducimus voluptas sunt quidem sit repellat beatae fugiat
                    nisi eligendi aliquam quae laboriosam, vero ut! Blanditiis obcaecati magnam culpa 
                    dignissimos accusantium expedita maxime laudantium adipisci eos deserunt minus pariatur 
                    consequuntur sint inventore commodi aut dolores iste praesentium animi alias, officiis 
                    ad neque necessitatibus. Autem ratione iure beatae consectetur aperiam non, 
                </p>
            </div>
        </div>
    );
};

export default About;