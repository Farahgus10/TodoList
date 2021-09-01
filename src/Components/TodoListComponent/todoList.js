import React from "react";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './todoList.css'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        // width: '100%',
      },
    },
  }));

export default function TodoList(props){
    const classes = useStyles();
    return (
                <div className="todo_list">
                    {props.content.map((label, index) => <div key={index}><h2>{label.label}</h2></div>)}

                    <form className={classes.root} noValidate autoComplete="off" onSubmit={props.handleAddTask}>
                        <div className="input">
                            <TextField
                            className="text_field"
                            id="outlined-basic"
                            label="Add a Task" 
                            variant="outlined" 
                            name="item"
                            value={props.value}
                            onChange={props.handleInputOnChange}
                            />
                        </div>
                    </form>
                
                   <ul>
                    {props.content.flatMap((content) => content.content)
                        .map((content, i) => (
                            <li key={i}>
                                {content}
                                <div className="delete_icon">
                                    {<DeleteForeverIcon onClick={() => props.handleDelete(content)}/>}
                                </div>
                            </li>
                        ))}
                    </ul>   
                </div>
        
    )
}
