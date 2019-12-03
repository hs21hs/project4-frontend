import React, { Component } from 'react';


class NewFoodForm extends Component {

    state = {newFood: undefined}


    handleFoodNameChange = event => {
        this.setState({
          newFood: event.target.value
        })
      }
       
     
    render(){
        return (
        <div>

        
            <form>
            <label>new food</label>
             <input type="text" onChange={event => this.handleFoodNameChange(event)} value={this.state.newFood} />
            </form>

            <button onClick= {this.makeFood}>submit</button>

        </div>
        );
    }
}
export default NewFoodForm;