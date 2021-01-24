import React from 'react';
import classes from './BuildControl.module.css'

/*
    this is just one column of the box that control, it takes label as props
*/
const buildControl = props =>(
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button onClick={props.removed} className={classes.Less} disabled={props.disabled}>Less</button>
        <button onClick={props.added} className={classes.More}>More</button>
    </div>
);

export default buildControl;
