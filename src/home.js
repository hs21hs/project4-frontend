import React, { Component } from 'react';
import NewFoodForm from './components/newFoodForm';
import SignUp from './components/signUp';
import Login from './components/login';
import Logout from './components/logout';


class Home extends Component {

    state = {users: [],
        currentUserId: 0,
    
    }

componentDidMount(){
    fetch("http://localhost:3000/users")
    .then(resp => resp.json())
    .then(json => this.setState({users:[...json]}))
}

loginNewUser = (user) => {
    this.setState({currentUserId: user.id})
}
     
whichPage = () => {
if (this.state.currentUserId === 0){
    return(
        <div>
            <p>hello user1</p>
            <SignUp users = {this.state.users} handleLogin = {this.loginNewUser}/>
            <Login users = {this.state.users} handleLogin = {this.loginNewUser}/>
        </div>
    )
}else{
    return(
    <div>
        <Logout handleLogout = {this.handleLogout}/>
        <NewFoodForm />
    </div>  
    )
}
}

handleLogout = () => {
    this.setState({currentUserId: 0})
}


    render(){
        return (
            this.whichPage()
        );
    }
}
export default Home;