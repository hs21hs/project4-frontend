import React, { Component } from 'react';


class Login extends Component {
       
     state = {username: undefined}

     updateLogin = (e) => {
        this.setState({username: e.target.value})
     }

     
     signIn = (e) => {e.preventDefault();
        if(this.props.users.find(user => {return user.name === e.target.previousSibling.value})){
            const chosenUser = this.props.users.find(user => {return user.name === e.target.previousSibling.value})
            this.props.handleLogin(chosenUser)
        }
        else{
            alert("this username does not exist, please sign up :)")
        }
    }

    render(){
        return (
        <div>

        
            <form>
            <label>please login with username</label>
             <input type="text" onChange={event => this.updateLogin(event)} value={this.state.username} />
            <button type = "submit" onClick= {event => this.signIn(event)}>submit</button>
            </form>

            
        </div>
        );
    }
}
export default Login;