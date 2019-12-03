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
            <p>todays date is {this.props.todaysDate}</p>
            <form onSubmit = {e => this.props.handleEatenClick(e)}>
            <select name ="eat">
                {this.props.foods.map((food) => {
                    return(<option value={food.id}>{food.name}</option>)
                })}
            </select>
            <button value = "submit" >eat</button>
            </form>
            

        </div>
        );
    }
}
export default NewFoodForm;