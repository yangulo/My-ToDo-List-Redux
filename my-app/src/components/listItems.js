import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import CreateIcon from '@material-ui/icons/Create'
import DeleteIcon from '@material-ui/icons/Delete'
import ListOfDoneItems from './listDoneItems'
import AddItem from './addItem'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import SearchBar from './searchBar'
import escapeRegExp from 'escape-string-regexp'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
// Actions
import {boundAddItem, boundUpdateItem, boundDeleteItem, boundDoneItem, 
    boundDeleteDoneItem, boundHideItem} from '../actions'
import {connect} from 'react-redux'


class ListOfItems extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            itemUpdatedIndex: 0,
            newItem: "",
            addItem: "",
            doneItems: [],
            filterList: [],
            dialogFlagClosed: false, 
            open: true,
            searchFlag: false,
            addItemFlag: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleDialogOpen = this.handleDialogOpen.bind(this)
        this.itemToBeUpdated = this.itemToBeUpdated.bind(this)
        this.handleDoneDelete = this.handleDoneDelete.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleAddItemAndClose = this.handleAddItemAndClose.bind(this)
    }

    // Redux
    handleDialogOpen(index){
        this.setState({
            newItem: '',
            dialogFlagClosed: true,
            itemUpdatedIndex: index

        })
    }

    handleClick(value, index){
        this.props.boundDoneItem(value)
        this.props.boundHideItem(index)
    }

    handleDoneDelete(index) {
        this.props.boundDeleteDoneItem(index)
    }

    itemToBeAdded = text => {
        let item = ''
        item = text.charAt(0).toUpperCase() + text.slice(1)
        this.setState({
            addItem: item
        })
    }

    handleAddItemAndClose(){
        if(this.state.addItem.length>0){
            this.props.boundAddItem(this.state.addItem)
            this.setState({
                addItemFlag: false,
                addItem: ''
            })
        }
    }

    itemToBeUpdated(value){
        let item = ''
        item = value.charAt(0).toUpperCase() + value.slice(1)
        this.setState({
            newItem: item
        })
    }

    handleSaveAndClose(){
        if(this.state.newItem.length>0){
            this.props.boundUpdateItem(this.state.newItem, this.state.itemUpdatedIndex)
            this.setState({
                dialogFlagClosed: false
            })
        }
    }

    handleDelete(index){
        this.props.boundDeleteItem(index)
    }

    handleCancelClose(){
        this.setState({
            dialogFlagClosed: false,
            addItemFlag: false
        })
    }
    //

    handleSearch(value){
        if(value.length>0){
            this.setState({
                searchFlag: true
            })
            const val = value.toUpperCase()
            const li = this.props.listItems.items
            if (val) {
                // RegExp creates a regular expression object for matching text with a pattern
                const match = new RegExp(escapeRegExp(val), 'i')
                this.setState({
                    filterList: li.filter( item => match.test(item))
                })
            }
        } else {
            this.setState({
                searchFlag: false
            })
        }
    }

    openDialogAddItem(){
        this.setState({
            addItemFlag: true
        })
    }
  
    render() {
        let li
    if(this.state.searchFlag) {
        li = this.state.filterList
    } else {
        li = this.props.listItems.items
    }

    return (
        <div>
        <SearchBar f={this.handleSearch}/>
        <List id="myLI">
            {li.sort().map((value, index) => 
                <ListItem key={index}>
                    <ListItemIcon>
                        <Checkbox onClick={(e) => this.handleClick(value, index)}/>
                    </ListItemIcon>
                    <ListItemText primary={value}/>
                    <ListItemIcon>
                        <IconButton onClick={(e) => this.handleDialogOpen(index)}>
                            <CreateIcon/>
                        </IconButton>
                    </ListItemIcon>
                    <ListItemIcon>
                        <IconButton onClick={(e) => this.handleDelete(index)}>
                            <DeleteIcon/>
                        </IconButton>
                    </ListItemIcon>
                </ListItem>)}
        </List>
        <ListOfDoneItems p={this.props.listItems.itemsDone} f={this.handleDoneDelete}/>
        <Fab color="secondary" aria-label="edit">
            <AddIcon onClick={(e) => this.openDialogAddItem()}/>
        </Fab>
        {this.state.dialogFlagClosed ? 
            <Dialog open={this.state.dialogFlagClosed}>
                <DialogTitle>Update Item</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField multiline rowsMax="4" label="What's new?" placeholder="Update your item here!" onChange={(event) => 
                        this.itemToBeUpdated(event.target.value)}/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => this.handleCancelClose()}>Cancel</Button>
                    <Button onClick={(e) => this.handleSaveAndClose()}>Save</Button>
                </DialogActions>
            </Dialog> : ""}
        <AddItem/>
        {this.state.addItemFlag ? 
            <Dialog open={this.state.addItemFlag}>
            <DialogTitle>Add Item</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <TextField multiline rowsMax="4" label="Let's add this!" placeholder="Add your item here" onChange={(event) => 
                    this.itemToBeAdded(event.target.value)}/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={(e) => this.handleCancelClose()}>Cancel</Button>
                <Button onClick={(e) => this.handleAddItemAndClose()}>Save</Button>
            </DialogActions>
        </Dialog> : ""}
        </div>
    )}
}

function mapStateToProps(state){
    return{
        listItems: state.todos
    }
}

export default connect(
    mapStateToProps,
    {boundAddItem, boundUpdateItem, boundDeleteItem, boundDoneItem, boundDeleteDoneItem, boundHideItem}
)(ListOfItems)


