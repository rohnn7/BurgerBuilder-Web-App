import React from 'react';
import orginal from "../../assets/images/original.png"; 
import classes from './Logo.module.css'

const logo = (props)=>(
    <div className={classes.Logo}>
        <img src={orginal} alt="Logo"  style={{height:props.height}}/>
    </div>
)

export default logo;