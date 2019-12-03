import React, { Component } from 'react';


class Logout extends Component {
       
    render(){
        return (
        <div>
            <button onClick= { this.props.handleLogout}>logout</button>  
        </div>
        );
    }
}
export default Logout;