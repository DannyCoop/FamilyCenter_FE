import React from 'react';
import Task from '../Components/Task';
import '../CSS_Folder/Task_CSS/taskContainer.css'


export default function TaskList(){
    return(
        <div className="TaskContainer">
            <Task />
        </div>
    )
}