import React, { Component } from 'react'
import {Link} from "react-router-dom";
import AuthEvent from '../utilities/AuthEvent';
import AuthService from "../utilities/AuthService";
const eventUtils = new AuthEvent();
const auth = new AuthService();


export default class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {}
    }  
  }
  componentDidMount(){
    eventUtils.getUserDB()
    .then(response => {
      console.log(response)
      this.setState({
        user: response.data
      })
    })
    .catch(error =>{
      console.log(error);
      if(error.response.data.message === "Unauthorized") this.props.history.push("/")
    })
  }
  render() {
    return (
     <div>
      <img className="signup-logo" src="/img/cleanup-logo.png" alt="img"/>
        <div className="profile-body">
          <div className="profile-header">
            <Link 
              to="/" 
              className="link-logout" 
              onClick={this.handleLogout}>
              logout
            </Link>
            <Link
              to="/profile">
              <h3 className="hello">
              Hi, {auth.getUser()}</h3>
            </Link>    
          </div>
        <div className="profile-container">
          <div className="profile-1">
            <Link
              to='/cleanups'
              className="link-profile">
              <h3>Browse CleanUps    </h3> 
            </Link>   
          </div>
          <div className="profile-2">
            <Link
              to='/create_event'
              className="link-profile">
              <h3>Plan a CleanUp</h3>
            </Link>             
          </div>
          <div className="profile-3">
            <Link
              to='/mycleanups'
              className="link-profile">
              <h3>My CleanUps</h3>
            </Link>
          </div>
          <div className="upcoming">
            <Link
              to='/upcoming'
              className="link-profile">
              <h3>Upcoming CleanUps</h3>
            </Link>
          </div>
          </div>
        </div>
     </div> 
    )
  }
}
