import React from 'react'
import { NavLink } from 'react-router-dom';

const Error = () => {
  return (
    <div>
        <center>
            <h1 style={{color:'red', fontSize:'11rem',fontWeight:'600'}}>
                404
            </h1>
            <h4 style={{color:'white'}}> 
                The page that you are currently trying to access is not available!! 
            </h4>
            <div className='btns'>
                <NavLink to="/">Return Home</NavLink>
                <NavLink to="/contact">Report Problem</NavLink>
            </div>
        </center>
      
    </div>
  )
};

export default Error;
