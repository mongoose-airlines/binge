import { get } from 'mongoose';
import React, { Component } from 'react'
import { getAllUsers } from '../../services/userService'
import { Redirect } from 'react-router-dom'

class UsersPage extends Component {
  state = {
    users: []
  }

  async componentDidMount() {
    if (this.props.user) {
      const users = await getAllUsers();
      this.setState({ users })
    }
    else {
      this.props.history.push('/login')
    }
  }

  render(){
    return (
      <>
        <h1>Hello. This is a list of all the users.</h1>
        {this.state.users.map(user => 
          <p>{user.name} </p>
        )}
      </>
    );
  }
 }

 
export default UsersPage;