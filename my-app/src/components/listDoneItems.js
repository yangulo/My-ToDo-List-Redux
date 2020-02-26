import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'

export default function ListOfDoneItems(props) {
    const doneItems = props.p
    const isEmpty = doneItems.length <= 0 ? true : false

        return(
            <div>
                {isEmpty ? "" : <h2 style={{color: "red"}}>Done Items</h2>}
                <List>
                    {doneItems.map((item, index) => 
                    <ListItem key={item}>
                        <ListItemText style={{color: "red"}} primary={item}/>
                        <ListItemIcon>
                            <IconButton>
                                <DeleteIcon onClick={(e) => props.f(index)}/>
                            </IconButton>
                        </ListItemIcon>
                    </ListItem>
                    )}
                </List> 
            </div>
        )
}
