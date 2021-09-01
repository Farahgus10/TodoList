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
    // display: 'flex',
    // // justifyContent: 'space-evenly'
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
    trashIconColor1: 'transparent',
    // trashIconColor2: /
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
    selectedIcon: [],
    tabs: JSON.parse(localStorage.getItem('tabs')) || [
      {
        id: 0,
        icon: <ShoppingCartIcon />,
        label: 'Groceries',
        content: ['grocery list', 'test']
      }, 
      {
        id: 1,
        icon: <SchoolIcon />,
        label: 'School',
        content: ['school list', 'test']
      }
    ],
    value: '',
  }

  componentDidMount() {
    // let tabs = ls.get('tabs')
    // console.log(tabs)
    fetch(URL)
    // .then(response => response.json())
    .then(this.setState({
      activeTab: ls.get('activeTab') || 0,
      tabs: ls.get('tabs') || [] 
    }));
    // console.log(this.state.tabs)
  }

  // handles clicking the tabs, and sets activeTab in our state
  handleTabClick(index) {
    this.setState(({
      activeTab: index
    }))
    localStorage.setItem('activeTab', index)
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
      id: 2,
      icon: <DehazeIcon />,
      label: new_category.value,
      content: []
    }
    this.setState({
      tabs: [...this.state.tabs, newCat],
      activeTab: this.state.tabs.length,
      selectIcon: true,
      // newCategorySelected: false
    },() => localStorage.setItem('tabs', JSON.stringify(this.state.tabs)))
    } else {
      this.setState({
        newCategorySelected: false
      })
    }
    
    // console.log(window.localStorage)
  }

  // Handle to add icon to a category
  handleAddIcon = (icon) => {
    console.log(icon.name)
    let iconValue = icon.icon;
    let activeTab = this.state.activeTab;
    let tabs = [...this.state.tabs];
    tabs[activeTab].icon = [iconValue]
    this.setState({
      tabs,
      selectIcon: false,
      newCategorySelected: false
    })
  }

  // renders either the input bar to add a new category after clicking the + button, or it renders the + button
  renderCategoryInput = () => {
    let newCategoryField;
    if(this.state.newCategorySelected && !this.state.selectIcon) {
        newCategoryField = 
        <form onSubmit={this.handleAddButton} className="new_cat_form">
          <input id="new_category" name="new_category" className="new_cat_input"/>
          <button className="add_button">Add</button>
        </form>
    } else if (this.state.newCategorySelected && this.state.selectIcon) {
      newCategoryField = <h3>Select an icon from the top</h3>
    } else {
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
    const {classes, theme} = this.props;
    let tabs;
    (JSON.parse(localStorage.getItem('tabs')).length != 0) ? tabs = JSON.parse(localStorage.getItem('tabs')) : tabs = []
    console.log(tabs.map(id => id.icon))

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
          
            {tabs.map((tab, index) => (
              <div className="list_item" key={index} onClick={() => this.handleTabClick(index)}>
                <ListItem button>
                   <ListItemIcon>{tab.id}</ListItemIcon> 
                  <ListItemText primary={tab.label.toString()} />
                  <ListItemIcon>
                    <div className="trash_icon_container" onClick={() => this.handleDeleteCategory(tab)}>
                      <DeleteForeverIcon className="trash_icon"/>
                    </div>
                  </ListItemIcon>
                  
                </ListItem> 
              </div>
            
            ))}
         
          </List> 
          {/* <Divider /> */}
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
