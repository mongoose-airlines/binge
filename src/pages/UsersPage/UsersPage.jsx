import { get } from 'mongoose';
import React, { Component } from 'react'
import { getAllUsers } from '../../services/userService'
import { Redirect } from 'react-router-dom'

class UsersPage extends Component {
  state = {
    users: []
  }

  async componentDidMount() {
    const users = await getAllUsers();
    this.setState({ users })
  }

  render(){
    return (
      <>
        {this.props.user ? 
          <>
            <h1>Hello. This is a list of all the users.</h1>
            {this.state.users.map(user => 
              <p>{user.name} </p>
            )}
          </>
        :
          <Redirect 
            to='/login'
          />
        }
      </>
    );
  }
 }

 
export default UsersPage;