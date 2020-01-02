import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary'
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  closeSideDrawerHandler = () => {
    console.log('closed')
    this.setState({showSideDrawer: false})
  }

  openSideDrawerHandler = () => {
    console.log('open');
    this.setState({showSideDrawer: true});
  }

  render() {
    return (
      <Auxiliary>
      <Toolbar toggleMenu={this.openSideDrawerHandler}/>
      <SideDrawer closed={this.closeSideDrawerHandler} open={this.state.showSideDrawer}/>
      <main className={classes.Content}>
        {this.props.children}
      </main>
      </Auxiliary>
    )
  }
} 


export default Layout;


