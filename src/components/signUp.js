import React, { Component } from 'react';


class SignUp extends Component {
       
     state = {username: undefined}

     updateSignUp = (e) => {
        this.setState({username: e.target.value})
     }

     
     signIn = (e) => {e.preventDefault();
        if(this.props.users.find(user => {return user.name === e.target.previousSibling.value})){
            alert("this username is taken, please choose a new one :)")
        }
        else{
            fetch("http://localhost:3000/users", {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({user:{name: e.target.previousSibling.value}})
            })
            .then(resp => resp.json())
            .then(json => this.props.handleLogin(json))
        }
    }

    render(){
        return (
        <div>

        
            <form>
            <label>please sign up with username</label>
             <input type="text" onChange={event => this.updateSignUp(event)} value={this.state.username} />
            <button type = "submit" onClick= {event => this.signIn(event)}>submit</button>
            </form>

            
        </div>
        );
    }
}
export default SignUp;