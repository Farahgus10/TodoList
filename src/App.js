import React from 'react';
import './App.css';
import ls from 'local-storage'
import { NavItem, NavIcon } from '@trendmicro/react-sidenav';
import { withStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import ApartmentIcon from '@material-ui/icons/Apartment';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import DehazeIcon from '@material-ui/icons/Dehaze';
import DescriptionIcon from '@material-ui/icons/Description';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import EmailIcon from '@material-ui/icons/Email';
import EventIcon from '@material-ui/icons/Event';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SchoolIcon from '@material-ui/icons/School';
import ComputerIcon from '@material-ui/icons/Computer';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import TodoList from './Components/TodoListComponent/todoList'
import Navbar from './Components/NavbarComponent/navbar'

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';


const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class App extends React.Component {
  state = {
    newCategorySelected: false,
    selectIcon: false,
    activeTab: 0,
    icons: [
      {
        name: 'alarm',
        icon: <AccessAlarmIcon />
      },
      {
        name: 'account',
        icon: <AccountBalanceIcon />
      },
      {
        name: 'airplane',
        icon: <AirplanemodeActiveIcon />
      }, 
      {
        name: 'apartment',
        icon: <ApartmentIcon />
      },
      {
        name: 'email',
        icon: <AlternateEmailIcon />
      },
      {
        name: "notes",
        icon: <DehazeIcon />
      }, 
      {
        name: 'description',
        icon: <DescriptionIcon />
      },
      {
        name: 'car',
        icon: <DirectionsCarIcon />
      },
      {
        name: 'email2',
        icon: <EmailIcon />
      },
      {
        name: 'event',
        icon: <EventIcon />
      },
      {
        name: 'favorite',
        icon: <FavoriteIcon />
      },
      {
        name: 'shopping',
        icon: <ShoppingCartIcon />
      },
      {
        name: 'school',
        icon: <SchoolIcon />
      }, 
      {
        name: 'computer',
        icon: <ComputerIcon />
      }
    ],
      tabs: [
      {
        icon: <ShoppingCartIcon />,
        label: 'Groceries',
        content: []
      }, 
      {
        icon: <SchoolIcon />,
        label: 'School',
        content: []
      }
    ],
    value: '',
  }

  // handles clicking the tabs, and sets activeTab in our state
  handleTabClick(index) {
    this.setState(({
      activeTab: index
    }))
  }

  // grabs the value from the input bar in the child component and sets our state. This value is grabbed in the handleChildSubmit function
  handleInputOnChange = e => {
    this.setState({
      value: e.target.value
    })
  }

  // handles the input bar in the todoList component. Adds a new list item to tabs
  handleAddTask = e => {
    e.preventDefault()
    let value = this.state.value;
    let activeTab = this.state.activeTab;

    let tabs = [...this.state.tabs];
    tabs[activeTab].content = [...tabs[activeTab].content, value]

    // reset value state so that input bar is empty
    this.setState({
      tabs,
      value: ''
    })
  }

  // handles trash can button next to list items
  handleDelete = (content) => {
    let activeTab = this.state.activeTab;
    let tabs = [...this.state.tabs];
    tabs[activeTab].content = [...tabs[activeTab].content.filter(item => item != content)]
    this.setState({tabs})
  }

  // after clicking the + button, this sets the newCategorySelect = true, which renders the input the input bar
  addNewCategory = () => {
    this.setState({
      newCategorySelected: true
    })
  }

  handleDeleteCategory = (tab) => {
    let tabs = [...this.state.tabs];
    tabs = [...tabs.filter(item => item != tab)]
    this.setState({tabs})
  }

  // handles the add button next to the input bar. This adds a new category to our state
  handleAddButton = e => {
    e.preventDefault();
    const { new_category } = e.target;
    let newCat;
    if(new_category.value) {
      newCat = {
      icon: <DehazeIcon />,
      label: new_category.value,
      content: []
    }
    this.setState({
      tabs: [...this.state.tabs, newCat],
      activeTab: this.state.tabs.length,
      selectIcon: true,
    })
    } else { // if user clicks Add but with no input, do not add new object to Tabs
      this.setState({
        newCategorySelected: false
      })
    }
  }

  // Handle to add icon to a category
  handleAddIcon = (icon) => {
    let iconValue = icon.icon;
    let activeTab = this.state.activeTab;

    // get original value of state and then modify the icon of the tab where i = activeTab
    let tabs = [...this.state.tabs];
    tabs[activeTab].icon = iconValue;
    this.setState({
      tabs,
      selectIcon: false,
      newCategorySelected: false
    })
  }

  // renders either the input bar to add a new category after clicking the + button, or it renders the + button
  renderCategoryInput = () => {
    let newCategoryField;
    
    // first step, after clicking '+', show the input field
    if(this.state.newCategorySelected && !this.state.selectIcon) {
        newCategoryField = 
        <form onSubmit={this.handleAddButton} className="new_cat_form">
          <input id="new_category" name="new_category" className="new_cat_input"/>
          <button className="add_button">Add</button>
        </form>
    } 
    // second step, after clicking "Add", show the prompt to select icon
    else if (this.state.newCategorySelected && this.state.selectIcon) {
      newCategoryField = <h3>Select an icon from the top</h3>
    } 
    // once icon is selected, go back to showing the '+' 
    else {
       newCategoryField = 
       <div>
         <Divider />
          <NavItem>
            <NavIcon  onClick={this.addNewCategory}>
                <AddIcon className="add_button"/>
            </NavIcon>
          </NavItem>
       </div>
       
    }
    return newCategoryField
  }

  render() {
    const {classes} = this.props;
    let filteredContent = this.state.tabs.filter((tab, index) => {
      if(index === this.state.activeTab) {
        return tab;
      }
    })

    return (
      <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
            <Navbar icons={this.state.icons} addIcon={this.handleAddIcon} selectIcon={this.state.selectIcon}/>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
      <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {this.state.tabs.map((tab, index) => (
              <div className="list_item" key={index} onClick={() => this.handleTabClick(index)}>
                <ListItem button>
                   <ListItemIcon>{tab.icon}</ListItemIcon> 
                  <ListItemText primary={tab.label} />
                  <ListItemIcon>
                    <div className="trash_icon_container" onClick={() => this.handleDeleteCategory(tab)}>
                      <DeleteForeverIcon className="trash_icon"/>
                    </div>
                  </ListItemIcon>
                </ListItem> 
              </div>
            ))}
          </List> 
          {this.renderCategoryInput()}
        </div>

      </Drawer>
      <main className={classes.content}>
        <Toolbar />
            <TodoList activeTab={this.state.activeTab} 
              content={filteredContent} 
              value={this.state.value}
              handleInputOnChange={this.handleInputOnChange}
              handleAddTask={this.handleAddTask}
              handleDelete={this.handleDelete}
            />
      </main>
    </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(App);
